// Minimal and elegant timeline functionality
document.addEventListener("DOMContentLoaded", function () {
	// Timeline reveal animation on scroll
	const timelineItems = document.querySelectorAll(".timeline-item");

	const observerOptions = {
		threshold: 0.2,
		rootMargin: "0px 0px -50px 0px",
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
			}
		});
	}, observerOptions);

	timelineItems.forEach((item) => {
		observer.observe(item);
	});

	// Smooth scroll for navigation
	const scrollIndicator = document.querySelector(".scroll-indicator");
	if (scrollIndicator) {
		scrollIndicator.addEventListener("click", () => {
			const timeline = document.querySelector(".timeline");
			timeline.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		});
	}

	// Simple hover effects for timeline markers
	const markers = document.querySelectorAll(".marker-icon");
	markers.forEach((marker) => {
		marker.addEventListener("mouseenter", function () {
			this.style.transform = "scale(1.05) translateX(-50%)";
		});

		marker.addEventListener("mouseleave", function () {
			this.style.transform = "scale(1) translateX(-50%)";
		});
	});

	// Simple click effect for timeline content
	const timelineContent = document.querySelectorAll(".timeline-content");
	timelineContent.forEach((content) => {
		content.addEventListener("click", function () {
			this.style.transform = "scale(0.99)";
			setTimeout(() => {
				this.style.transform = "scale(1)";
			}, 150);
		});
	});

	// Keyboard navigation for accessibility
	document.addEventListener("keydown", (e) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			const currentItem = document.querySelector(".timeline-item.visible");
			if (currentItem && currentItem.nextElementSibling) {
				currentItem.nextElementSibling.scrollIntoView({ behavior: "smooth" });
			}
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			const currentItem = document.querySelector(".timeline-item.visible");
			if (currentItem && currentItem.previousElementSibling) {
				currentItem.previousElementSibling.scrollIntoView({
					behavior: "smooth",
				});
			}
		}
	});

	// Touch gestures for mobile
	let touchStartY = 0;
	let touchEndY = 0;

	document.addEventListener("touchstart", (e) => {
		touchStartY = e.touches[0].clientY;
	});

	document.addEventListener("touchend", (e) => {
		touchEndY = e.changedTouches[0].clientY;
		handleSwipe();
	});

	function handleSwipe() {
		const swipeThreshold = 60;
		const diff = touchStartY - touchEndY;

		if (Math.abs(diff) > swipeThreshold) {
			if (diff > 0) {
				// Swipe up - go to next timeline item
				const currentItem = document.querySelector(".timeline-item.visible");
				if (currentItem && currentItem.nextElementSibling) {
					currentItem.nextElementSibling.scrollIntoView({ behavior: "smooth" });
				}
			} else {
				// Swipe down - go to previous timeline item
				const currentItem = document.querySelector(".timeline-item.visible");
				if (currentItem && currentItem.previousElementSibling) {
					currentItem.previousElementSibling.scrollIntoView({
						behavior: "smooth",
					});
				}
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

	// Smooth scroll to top when button is clicked
	scrollToTopBtn.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});

	// Enhanced scroll behavior for better performance
	let ticking = false;

	function updateScroll() {
		ticking = false;
		// Any scroll-based animations can go here
	}

	window.addEventListener("scroll", () => {
		if (!ticking) {
			requestAnimationFrame(updateScroll);
			ticking = true;
		}
	});

	console.log("✨ Our Story Timeline loaded with minimal elegance! 💕");
});
