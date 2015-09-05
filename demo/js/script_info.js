//При загрузке инфо
function info() {
	slide.innerHTML = '';
	var text = document.createElement('p');
    text.innerHTML = info1;
    slide.appendChild(text);
	var text = document.createElement('p');
    text.innerHTML = info2;
    slide.appendChild(text);
	var text = document.createElement('p');
    text.innerHTML = info3;
    slide.appendChild(text);
	var text = document.createElement('p');
    text.innerHTML = info4;
    slide.appendChild(text);
	var text = document.createElement('p');
    text.innerHTML = info5;
    slide.appendChild(text);
	var text = document.createElement('p');
    text.innerHTML = info6;
    slide.appendChild(text);
	var text = document.createElement('p');
    text.innerHTML = "Продолжительность лекции: "+timeFormat(video.duration);
    slide.appendChild(text);
	var text = document.createElement('p');
    text.innerHTML = "Количество демонстраций: "+cart.slides.length;
    slide.appendChild(text);
}

