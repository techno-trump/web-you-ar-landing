
import Swiper, { Navigation, Lazy, Autoplay } from 'swiper';

import "../../scss/libs/swiper.scss";

export const initSlider = () => {
	return new Swiper('.targeting__slider', { // Указываем скласс нужного слайдера
		// Подключаем модули слайдера
		// для конкретного случая
		modules: [Autoplay, Navigation, Lazy],
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 0,
		speed: 800,
		loop: true,
		lazy: true,
		grabCursor: true,
		preloadImages: false,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		effect: 'fade',
		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.targeting__prev-btn',
			nextEl: '.targeting__next-btn',
		},
		breakpoints: {
			// 640: {
			// 	slidesPerView: 1,
			// 	spaceBetween: 0,
			// 	autoHeight: true,
			// },
			768: {
				slidesPerView: 3,
			},
			992: {
				slidesPerView: 1,
			},
		},
		on: {

		}
	});
}