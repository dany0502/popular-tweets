import "intersection-observer";

let observer = null;
const DEFAULT_VISIBILITY_THRESHOLD = 0.5;

export default {
  bind(el, binding) {
    const imageUrl = (binding.value && binding.value.defaultImageUrl) || null;
    if (imageUrl !== null) {
      // Show default image if failed to load original image.
      el.addEventListener(
        "error",
        () => {
          el.setAttribute("src", imageUrl);
          el.removeAttribute("data-src");
        },
        {
          once: true
        }
      );
    }
    if (observer === null) {
      const threshold =
        (binding.value && binding.value.threshold) ||
        DEFAULT_VISIBILITY_THRESHOLD;
      observer = new IntersectionObserver(
        changes => {
          for (const change of changes) {
            if (change.isIntersecting) {
              const url = change.target.getAttribute("data-src");
              if (url !== null) {
                change.target.setAttribute("src", url);
                change.target.removeAttribute("data-src");
              }
            }
          }
        },
        { threshold }
      );
    }
    observer.observe(el);
  },
  unbind(el) {
    observer.unobserve(el);
  }
};
