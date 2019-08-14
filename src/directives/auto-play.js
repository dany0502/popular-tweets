require("intersection-observer");

let observer = null;
const DEFAULT_VISIBILITY_THRESHOLD = 0.5;

export default {
  bind(el, binding) {
    if (observer === null) {
      const threshold =
        (binding.value && binding.value.threshold) ||
        DEFAULT_VISIBILITY_THRESHOLD;
      observer = new IntersectionObserver(
        changes => {
          for (const change of changes) {
            if (change.isIntersecting) {
              change.target.play().catch(() => {
                // ignore error
              });
            } else {
              change.target.pause();
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
