// Minimal and elegant timeline functionality
document.addEventListener("DOMContentLoaded", function () {
	// Responsive timeline reveal animation
	const timelineItems = document.querySelectorAll(".timeline-item");

	// Check if device supports reduced motion
	const prefersReducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)"
	).matches;

	if (!prefersReducedMotion) {
		// Create intersection observer for smooth animations
		const observerOptions = {
			threshold: 0.1,
			rootMargin: "0px 0px -50px 0px",
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// Add staggered animation based on device type
					const isMobile = window.innerWidth <= 767;
					const animationClass = isMobile
						? "mobile-visible"
						: "desktop-visible";

					entry.target.classList.add(animationClass);

					// Add animation delay for staggered effect
					const index = Array.from(timelineItems).indexOf(entry.target);
					entry.target.style.animationDelay = `${index * 0.1}s`;
				}
			});
		}, observerOptions);

		timelineItems.forEach((item) => {
			observer.observe(item);
		});
	} else {
		// For users who prefer reduced motion, show all items immediately
		timelineItems.forEach((item) => {
			item.style.opacity = "1";
			item.style.transform = "translateY(0)";
		});
	}

	// Responsive hover effects for desktop
	const isDesktop = window.innerWidth >= 768;

	if (isDesktop) {
		// Enhanced hover effects for desktop
		timelineItems.forEach((item) => {
			item.addEventListener("mouseenter", () => {
				item.style.transform = "translateY(-8px)";
			});

			item.addEventListener("mouseleave", () => {
				item.style.transform = "translateY(0)";
			});
		});
	}

	// Touch device optimizations
	if ("ontouchstart" in window) {
		// Add touch feedback for mobile devices
		timelineItems.forEach((item) => {
			item.addEventListener("touchstart", () => {
				item.style.transform = "scale(0.98)";
			});

			item.addEventListener("touchend", () => {
				item.style.transform = "scale(1)";
			});
		});
	}

	// Simple click effect for timeline content
	const timelineContents = document.querySelectorAll(".timeline-content");
	timelineContents.forEach((content) => {
		content.addEventListener("click", () => {
			content.style.transform = "scale(0.98)";
			setTimeout(() => {
				content.style.transform = "scale(1)";
			}, 150);
		});
	});

	// Keyboard navigation - natural scrolling
	document.addEventListener("keydown", (e) => {
		if (e.key === "ArrowUp") {
			window.scrollBy(0, -100);
		} else if (e.key === "ArrowDown") {
			window.scrollBy(0, 100);
		}
	});

	// Enhanced touch gestures for mobile
	let touchStartY = 0;
	let touchEndY = 0;

	document.addEventListener("touchstart", (e) => {
		touchStartY = e.changedTouches[0].screenY;
	});

	document.addEventListener("touchend", (e) => {
		touchEndY = e.changedTouches[0].screenY;
		handleSwipe();
	});

	function handleSwipe() {
		const swipeThreshold = 50;
		const diff = touchStartY - touchEndY;

		if (Math.abs(diff) > swipeThreshold) {
			if (diff > 0) {
				// Swipe up
				window.scrollBy(0, 200);
			} else {
				// Swipe down
				window.scrollBy(0, -200);
			}
		}
	}

	// Scroll to Top Button Functionality
	const scrollToTopBtn = document.getElementById("scroll-to-top");

	// Show/hide button based on scroll position
	window.addEventListener("scroll", () => {
		if (window.pageYOffset > 300) {
			scrollToTopBtn.classList.add("visible");
		} else {
			scrollToTopBtn.classList.remove("visible");
		}
	});

	// Natural scroll to top when button is clicked
	scrollToTopBtn.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
			behavior: "auto",
		});
	});

	// Scroll indicator click - natural scrolling
	const scrollIndicator = document.querySelector(".scroll-indicator");
	if (scrollIndicator) {
		scrollIndicator.addEventListener("click", () => {
			const timeline = document.querySelector(".timeline");
			if (timeline) {
				timeline.scrollIntoView({ behavior: "auto" });
			}
		});
	}

	// Responsive performance optimization
	let resizeTimeout;
	window.addEventListener("resize", () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			// Recalculate responsive elements on resize
			const isMobile = window.innerWidth <= 767;
			if (isMobile) {
				document.body.classList.add("mobile-view");
			} else {
				document.body.classList.remove("mobile-view");
			}
		}, 250);
	});

	// Initialize responsive state
	const isMobile = window.innerWidth <= 767;
	if (isMobile) {
		document.body.classList.add("mobile-view");
	}
});
