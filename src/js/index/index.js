import { initSlider } from "./slider.js";

document.addEventListener("DOMContentLoaded", initPage);

function initPage() {
	initMainMenu();
	initSlider();
	const scrollToSection = initNavToSection();
	scrollToSectionByRequest(scrollToSection);
}
function initMainMenu() {
	const btnElem = document.querySelector(".header__menu-btn");
	const menuContainerElem = document.querySelector(".header__menu");
	btnElem.addEventListener("click", (event) => {
		btnElem.classList.toggle("active");
		menuContainerElem.classList.toggle("open");
	});
	menuContainerElem.addEventListener("click", event => {
		if (event.target.classList.contains("menu-text-btn") ||
				!event.target.closest(".main-menu__wrap")) {
					btnElem.classList.remove("active");
					menuContainerElem.classList.remove("open");
				}
	});
	
	
	const mpb = window.matchMedia("(max-width: 1199px)");
	const widthCrossHandler = ({ matches }) => {
		btnElem.classList.remove("active");
		menuContainerElem.classList.remove("open");
	};
	mpb.addListener(widthCrossHandler);
	widthCrossHandler(mpb);
}
function initNavToSection() {
	const navElems = document.querySelectorAll("[data-nav-section]");
	const headerElem = document.querySelector(`header`);
	const scrollTo = sectionId => {
		const sectionElem = sectionElemsMap[sectionId];
		if (!sectionElem) return false;
		const newScrollY = sectionElem.offsetTop - headerElem.offsetHeight;
		window.scrollTo({ top: newScrollY, behavior: 'smooth' });
		return true;
	};
	let clickHandler = event => {
		event.preventDefault();
		const sectionId = event.target.getAttribute("data-nav-section");
		if (!scrollTo(sectionId)) {
			location.assign(`${location.origin}/?section=${sectionId}`);
		};
	};
	const sectionSelectors = [].map.call(navElems, (elem) => {
		elem.addEventListener("click", clickHandler);
		return `#${elem.getAttribute("data-nav-section")}`;
	});
	const sectionElems = document.querySelectorAll(sectionSelectors.join(", "));
	const sectionElemsMap = [].reduce.call(sectionElems, (result, elem) => {
		result[elem.getAttribute("id")] = elem;
		return result;
	}, {});



	return scrollTo;
}
function scrollToSectionByRequest(scrollToSection) {
	const request = new URLSearchParams(window.location.search);
	const sectionId = request.get("section");
	scrollToSection(sectionId);
}

function debounce(callback, delay) {
	let timeout;
	return (...args) => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			callback(...args);
			timeout = null;
		}, delay);
	};
}