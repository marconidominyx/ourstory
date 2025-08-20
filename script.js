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

	// Responsive hover effects for desktop only
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
	} else {
		// On mobile, ensure no transform animations that could interfere with scrolling
		timelineItems.forEach((item) => {
			item.style.transform = "none";
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
