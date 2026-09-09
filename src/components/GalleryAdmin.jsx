import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaSignOutAlt,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import { staticGalleryImages } from "../data/galleryImages";
import {
  deleteGalleryUpload,
  fetchGalleryState,
  getAdminToken,
  loginToGallery,
  setAdminToken,
  setStaticImageHidden,
  uploadGalleryImage,
  uploadedImageUrl,
} from "../lib/galleryClient";

function GalleryAdmin() {
  const [password, setPassword] = useState("");
  const [isAuthed, setIsAuthed] = useState(Boolean(getAdminToken()));
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [galleryState, setGalleryState] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const loadGallery = async () => {
    const nextState = await fetchGalleryState();
    setGalleryState(nextState);
  };

  useEffect(() => {
    if (!isAuthed) return;
    loadGallery().catch((loadError) => {
      setError(loadError.message);
    });
  }, [isAuthed]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError("");
    setIsSubmitting(true);
    try {
      await loginToGallery(password);
      setIsAuthed(true);
      setPassword("");
    } catch (loginFailure) {
      setLoginError(loginFailure.message || "Incorrect password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    setAdminToken(null);
    setIsAuthed(false);
    setGalleryState(null);
  };

  const runAction = async (action, successMessage) => {
    setError("");
    setStatus("");
    setIsSubmitting(true);
    try {
      const nextState = await action();
      setGalleryState(nextState);
      setStatus(successMessage);
    } catch (actionError) {
      if (actionError.status === 401) {
        handleLogout();
        setLoginError("Your session expired. Please sign in again.");
        return;
      }
      setError(actionError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList || []).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (!files.length) {
      setError("Choose photo files to upload.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      let nextState = galleryState;
      for (let index = 0; index < files.length; index += 1) {
        setStatus(`Uploading ${index + 1} of ${files.length}...`);
        nextState = await uploadGalleryImage(files[index]);
      }
      setGalleryState(nextState);
      setStatus(
        files.length === 1
          ? "Photo added to the gallery."
          : `${files.length} photos added to the gallery.`,
      );
    } catch (uploadError) {
      if (uploadError.status === 401) {
        handleLogout();
        setLoginError("Your session expired. Please sign in again.");
        return;
      }
      setError(uploadError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hiddenIds = new Set(galleryState?.hiddenStaticIds || []);
  const visibleStatic = staticGalleryImages.filter((image) => !hiddenIds.has(image.id));
  const hiddenStatic = staticGalleryImages.filter((image) => hiddenIds.has(image.id));
  const uploads = galleryState?.uploads || [];

  return (
    <div className="min-h-screen bg-soft-pearl text-deep-navy pt-32 pb-24 px-6">
      <Helmet>
        <title>Manage Gallery | Reet Sangeet</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {!isAuthed ? (
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleLogin}
            className="max-w-md mx-auto bg-white rounded-3xl shadow-sm border border-deep-navy/10 p-8 md:p-10"
          >
            <div className="w-14 h-14 rounded-full bg-soothing-teal/15 text-soothing-teal flex items-center justify-center text-xl mb-6">
              <FaLock />
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2">Manage gallery</h1>
            <p className="text-deep-navy/70 mb-8">
              Enter the staff password to add photos or hide photos from the public gallery.
            </p>
            <label className="block text-sm font-bold mb-2" htmlFor="gallery-password">
              Password
            </label>
            <input
              id="gallery-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-deep-navy/15 px-4 py-3 mb-4 outline-none focus:border-soothing-teal"
              autoComplete="current-password"
              required
            />
            {loginError && (
              <p className="text-sunset-coral text-sm font-semibold mb-4">{loginError}</p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-soothing-teal text-white font-bold py-3.5 rounded-full hover:bg-opacity-90 disabled:opacity-60 transition-all"
            >
              {isSubmitting ? "Checking..." : "Continue"}
            </button>
          </motion.form>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                  Manage <span className="text-sunset-coral">Gallery</span>
                </h1>
                <p className="text-deep-navy/70 mt-3 max-w-xl">
                  Upload new photos or hide existing ones. Changes appear on the public gallery page.
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 self-start border-2 border-deep-navy/15 font-bold px-5 py-2.5 rounded-full hover:border-sunset-coral hover:text-sunset-coral transition-colors"
              >
                <FaSignOutAlt /> Sign out
              </button>
            </div>

            <label
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setIsDragging(false);
                handleFiles(event.dataTransfer.files);
              }}
              className={`block rounded-3xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors mb-6 ${
                isDragging
                  ? "border-soothing-teal bg-soothing-teal/10"
                  : "border-deep-navy/15 bg-white hover:border-soothing-teal"
              }`}
            >
              <FaUpload className="mx-auto text-2xl text-soothing-teal mb-3" />
              <span className="font-bold">Drop photos here, or click to upload</span>
              <p className="text-sm text-deep-navy/60 mt-1">JPG, PNG, or WEBP. You can select more than one.</p>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                disabled={isSubmitting}
                onChange={(event) => {
                  handleFiles(event.target.files);
                  event.target.value = "";
                }}
              />
            </label>

            {status && <p className="text-soothing-teal font-semibold mb-4">{status}</p>}
            {error && <p className="text-sunset-coral font-semibold mb-4">{error}</p>}

            <section className="mb-12">
              <h2 className="text-2xl font-black mb-5">
                New photos <span className="text-deep-navy/40 text-lg">({uploads.length})</span>
              </h2>
              {uploads.length === 0 ? (
                <p className="text-deep-navy/60">No extra photos yet. Uploads will show first on the gallery page.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {uploads.map((image) => (
                    <article key={image.id} className="relative rounded-3xl overflow-hidden bg-white shadow-sm">
                      <img
                        src={uploadedImageUrl(image.id)}
                        alt="Uploaded gallery photo"
                        className="w-full h-48 object-cover"
                      />
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => {
                          if (!window.confirm("Remove this photo from the gallery?")) return;
                          runAction(
                            () => deleteGalleryUpload(image.id),
                            "Photo removed from the gallery.",
                          );
                        }}
                        className="absolute top-3 right-3 bg-white/95 text-sunset-coral p-2.5 rounded-full shadow hover:bg-sunset-coral hover:text-white transition-colors"
                        aria-label="Delete photo"
                      >
                        <FaTrash />
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-black mb-5">
                Current gallery photos{" "}
                <span className="text-deep-navy/40 text-lg">({visibleStatic.length})</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {visibleStatic.map((image, index) => (
                  <article key={image.id} className="relative rounded-3xl overflow-hidden bg-white shadow-sm">
                    <img
                      src={image.src}
                      alt={`Gallery photo ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() =>
                        runAction(
                          () => setStaticImageHidden(image.id, true),
                          "Photo hidden from the gallery.",
                        )
                      }
                      className="absolute top-3 right-3 bg-white/95 text-deep-navy p-2.5 rounded-full shadow hover:bg-deep-navy hover:text-white transition-colors"
                      aria-label="Hide photo"
                    >
                      <FaEyeSlash />
                    </button>
                  </article>
                ))}
              </div>
            </section>

            {hiddenStatic.length > 0 && (
              <section>
                <h2 className="text-2xl font-black mb-5">
                  Hidden photos <span className="text-deep-navy/40 text-lg">({hiddenStatic.length})</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {hiddenStatic.map((image) => (
                    <article key={image.id} className="relative rounded-3xl overflow-hidden bg-white shadow-sm opacity-80">
                      <img src={image.src} alt="Hidden gallery photo" className="w-full h-48 object-cover grayscale" />
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() =>
                          runAction(
                            () => setStaticImageHidden(image.id, false),
                            "Photo restored to the gallery.",
                          )
                        }
                        className="absolute top-3 right-3 bg-white/95 text-soothing-teal p-2.5 rounded-full shadow hover:bg-soothing-teal hover:text-white transition-colors"
                        aria-label="Restore photo"
                      >
                        <FaEye />
                      </button>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default GalleryAdmin;
