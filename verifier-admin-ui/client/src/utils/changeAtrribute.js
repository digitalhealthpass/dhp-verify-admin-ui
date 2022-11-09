/*
 *
 * (c) Copyright Merative US L.P. and others 2020-2022 
 *
 * SPDX-Licence-Identifier: Apache 2.0
 *
 */

const clickTableButton = () => {
	setTimeout(() => {
		const tables = document.getElementsByTagName('table');
		for (let i = 0; i < tables.length; i += 1) {
			tables[i].setAttribute('tabindex', '0');
		}
	}, 500);
};

export const listenByButton = () => {
	const buttons = document.getElementsByTagName('button');
	const divs = document.getElementsByTagName('div');
	let count = 0;
	let showMoreCount = 0;
	let count1 = 0;
	let showMoreCount1 = 0;

	for (let i = 0; i < buttons.length; i += 1) {
		if (buttons[i].getAttribute('aria-label') === 'Show as table') {
			buttons[i].addEventListener('click', clickTableButton, true);
			if (count === 0) {
				buttons[i].setAttribute('aria-label', 'Show as table for Credential Types');
			} else if (count === 1) {
				buttons[i].setAttribute('aria-label', 'Show as table for Scan Results');
			} else if (count === 2) {
				buttons[i].setAttribute('aria-label', 'Show as table for Issuer');
			}
			count += 1;
		}
	}
	for (let i = 0; i < buttons.length; i += 1) {
		if (buttons[i].getAttribute('aria-label') === 'More options') {
			buttons[i].addEventListener('click', clickTableButton, true);
			if (showMoreCount === 0) {
				buttons[i].setAttribute('aria-label', 'More options for Credential Types');
			} else if (showMoreCount === 1) {
				buttons[i].setAttribute('aria-label', 'More options for Scan Results');
			} else if (showMoreCount === 2) {
				buttons[i].setAttribute('aria-label', 'More options for Issuer');
			}
			showMoreCount += 1;
		}
	}
	for (let i = 0; i < divs.length; i += 1) {
		if (divs[i].getAttribute('aria-label') === 'Show as table') {
			divs[i].addEventListener('click', clickTableButton, true);
			if (count1 === 0) {
				divs[i].removeAttribute('aria-label', 'Show as table for Credential Types');
				divs[i].removeAttribute('role');
				divs[i].removeAttribute('aria-disabled');
			} else if (count1 === 1) {
				divs[i].removeAttribute('aria-label', 'Show as table for Scan Results');
				divs[i].removeAttribute('role');
				divs[i].removeAttribute('aria-disabled');
			} else if (count1 === 2) {
				divs[i].removeAttribute('aria-label', 'Show as table for Issuer');
				divs[i].removeAttribute('role');
				divs[i].removeAttribute('aria-disabled');
			}
			count1 += 1;
		}
	}
	for (let i = 0; i < divs.length; i += 1) {
		if (divs[i].getAttribute('aria-label') === 'More options') {
			divs[i].addEventListener('click', clickTableButton, true);
			if (showMoreCount1 === 0) {
				divs[i].removeAttribute('aria-label', 'More options for Credential Types');
				divs[i].removeAttribute('role');
				divs[i].removeAttribute('aria-disabled');
			} else if (showMoreCount1 === 1) {
				divs[i].removeAttribute('aria-label', 'More options for Scan Results');
				divs[i].removeAttribute('role');
				divs[i].removeAttribute('aria-disabled');
			} else if (showMoreCount1 === 2) {
				divs[i].removeAttribute('aria-label', 'More options for Issuer');
				divs[i].removeAttribute('role');
				divs[i].removeAttribute('aria-disabled');
			}
			showMoreCount1 += 1;
		}
	}
};

export const changeRoleByDiv = () => {
	const divs = document.getElementsByTagName('div');
	for (let i = 0; i < divs.length; i += 1) {
		if (divs[i].getAttribute('role') === 'link') {
			divs[i].setAttribute('role', 'presentation');
		}

		if (divs[i].getAttribute('data-name') === 'legend-items') {
			divs[i].setAttribute('aria-label', `Data groups ${i}`);
			const observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					if (mutation.type === 'attributes' && divs[i] && divs[i].getAttribute('aria-label') === 'Data groups') {
						divs[i].setAttribute('aria-label', `Data groups ${i}`);
					}
				});
			});

			observer.observe(divs[i], {
				attributes: true,
			});
		}

		if (divs[i].className === 'toolbar-control bx--overflow-menu' && divs[i] && divs[i].getAttribute('aria-disabled') === 'false') {
			listenByButton();

			const observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					if (mutation.type === 'attributes' && divs[i] && divs[i].className === 'toolbar-control bx--overflow-menu' && divs[i].getAttribute('aria-disabled') === 'false') {
						listenByButton();
					}
				});
			});

			observer.observe(divs[i], {
				attributes: true,
			});
		}

		if (divs[i].getAttribute('role') === 'toolbar') {
			divs[i].setAttribute('aria-label', `toolbar${[i]}`);
		}

		if (divs[i].className === 'bx--date-picker bx--date-picker--range') {
			const calendar = document.getElementsByClassName('flatpickr-calendar')[0];
			divs[i].appendChild(calendar);
		}

		if (divs[i].getAttribute('aria-describedby') === 'modal-description') {
			divs[i].setAttribute('aria-describedby', `modal-description-${[i]}`);
			divs[i].setAttribute('aria-labelledby', `modal-description-${[i]}`);
			divs[i].setAttribute('id', `modal-description-${[i]}`);
		}

		if (divs[i].className === 'toolbar-control bx--overflow-menu' && divs[i] && divs[i].getAttribute('aria-disabled') === 'false') {
			divs[i].setAttribute('role', 'button');

			const observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					if (
						mutation.type === 'attributes' &&
						divs[i] &&
						divs[i].getAttribute('role') !== 'button' &&
						divs[i].className === 'toolbar-control bx--overflow-menu' &&
						divs[i] &&
						divs[i].getAttribute('aria-disabled') === 'false'
					) {
						divs[i].setAttribute('role', 'button');
					}
				});
			});

			observer.observe(divs[i], {
				attributes: true,
			});
		}
	}
};

export const changeRoleByUnorderedList = () => {
	const uls = document.getElementsByTagName('ul');
	for (let i = 0; i < uls.length; i += 1) {
		uls[i].setAttribute('role', 'menu');
	}
};

export const changeIdByPtag = () => {
	const ps = document.getElementsByTagName('p');
	for (let i = 0; i < ps.length; i += 1) {
		if (ps[i].getAttribute('id') === 'modal-title') {
			ps[i].setAttribute('aria-labelledby', `modal-title-${[i]}`);
			ps[i].setAttribute('id', `modal-title-${[i]}`);
		}
		if (ps[i].getAttribute('id') === 'modal-description') {
			ps[i].setAttribute('aria-describedby', `modal-description-${[i]}`);
			ps[i].setAttribute('id', `modal-description-${[i]}`);
		}
	}
	changeRoleByDiv();
};

export const changeRoleBySpan = () => {
	const spans = document.getElementsByTagName('span');
	for (let i = 0; i < spans.length; i += 1) {
		if (spans[i].innerHTML === 'Focus sentinel') {
			spans[i].setAttribute('role', 'presentation');
		}
	}
};

export const addAltText = (data, type) => {
	const svgs = document.getElementsByTagName('svg');
	const filteredSvgs = [];
	listenByButton();
	for (let i = 0; i < svgs.length; i += 1) {
		if (svgs[i].getAttribute('class') === 'bx--cc--simple-bar') {
			filteredSvgs.push(svgs[i]);
		}
	}
	if (type === 'credTypeData' && filteredSvgs.length > 0) {
		if (filteredSvgs[0] && filteredSvgs[0].childNodes) {
			for (let i = 0; i < filteredSvgs[0].childNodes.length; i += 1) {
				if (data[i]) {
					filteredSvgs[0].childNodes[i].setAttribute('alt', data[i].group);
					filteredSvgs[0].childNodes[i].setAttribute('aria-label', `Credential Types ${data[i].group} ${data[i].value}`);
				}
			}
		}
	} else if (type === 'scanResult' && filteredSvgs.length > 0) {
		if (filteredSvgs[1] && filteredSvgs[1].childNodes) {
			for (let i = 0; i < filteredSvgs[1].childNodes.length; i += 1) {
				if (data[i]) {
					filteredSvgs[1].childNodes[i].setAttribute('alt', data[i].group);
					filteredSvgs[1].childNodes[i].setAttribute('aria-label', `Scan Results ${data[i].group} ${data[i].value}`);
				}
			}
		}
	} else if (type === 'issuerName' && filteredSvgs.length > 0) {
		if (filteredSvgs[2] && filteredSvgs[2].childNodes) {
			for (let i = 0; i < filteredSvgs[2].childNodes.length; i += 1) {
				if (data[i]) {
					filteredSvgs[2].childNodes[i].setAttribute('alt', data[i].group);
					filteredSvgs[2].childNodes[i].setAttribute('aria-label', `Issuer ${data[i].group} ${data[i].value}`);
				}
			}
		}
	}
};
