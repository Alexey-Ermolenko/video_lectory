lastSlide='NULL';
var startAction=0;
var lastAction=-1;
var statusLoop=0;
var statusSlide=true;

//Позиции для 3D
function draw_3D(i) 
{
	superX=cart2.line[i].x1;
	superY=cart2.line[i].y1;
	superZ=cart2.line[i].x2;
}

function dropSlide_script()
{
	document.getElementById('slide').innerHTML = '';
	info();
	statusSlide=false;
}

//Функция рисующая линию
function draw_line_script(i,widthRatioSize,heightRatioSize) 
{
	ctx.strokeStyle=cart2.line[i].color;
	ctx.beginPath();
	ctx.moveTo(cart2.line[i].x1*widthRatioSize, cart2.line[i].y1*heightRatioSize);
	ctx.lineTo(cart2.line[i].x2*widthRatioSize, cart2.line[i].y2*heightRatioSize);
	ctx.stroke();
}

//Функция чистящая доску
function clearBorder_script()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < cart.slide.length; i++) 
    {
		if (((cart.slide[i].time <= video.currentTime)&&(i == cart.slide.length - 1))||((cart.slide[i].time <= video.currentTime) && (cart.slide[i + 1].time > video.currentTime)))
		{
		var pic = new Image();
		pic.src = cart.slide[i].src;
		pic.onload = init(pic);
		}
	}
}

//Функция создающая лупу
function createLoop_script(i,heightRatioSize)
{
	//Провервка, создана ли уже лупа (в случае отсутствия падает производительность)
	//if(statusLoop!=cart.slide[i].id)
	//{
		//statusLoop=cart.slide[i].id;
	canvasLoop = document.getElementById("canvasLoop");
	var ctxL = canvasLoop.getContext('2d');
	var picL = new Image();
	picL.src = canvas.toDataURL("image/png");
	canvasLoop.width=canvas.width*2;
	canvasLoop.height=canvas.height*2;
	//Получение картинки из canvas для лупы
	picL.onload=function()
	{
		ctxL.drawImage(picL, 0, 0, canvasLoop.width, canvasLoop.height);
		$("div.loop").remove()
		$("img.loopimg").remove()
		$("#blackboard").imageLens(heightRatioSize);
	}
	//}
}

//Функция удаляющая лупу
function deleteLoop_script()
{
	$("div.loop").remove()
	$("img.loopimg").remove()
	//statusLoop="NoLoop";
}

//Функция передвигающая лупу по слайду
function positionLoop_script(i,widthRatioSize,heightRatioSize)
{
	var leftPos;
	var topPos;
	var leftPos2;
	var topPos2;
	//Масштаб лупы
	var widthRatio=2;
	var heightRatio=2;
	//Обращаемся к лупе
	var target=$('.loop');
	//Получаем кординаты краев слайда
	var rectCanvas=canvas.getBoundingClientRect();
	//Показываем лупу
    target.show();
	//Получаем координаты внутри слайда
	var x=cart2.line[i].x1;
	var y=cart2.line[i].y1;
	var pageX=cart2.line[i].x2;
	var pageY=cart2.line[i].y2;
	//Устанавливаем позицию картинки в лупе
	leftPos = String((x * widthRatio * widthRatioSize - target.width() / 2) * (-1));
    topPos = String((y * heightRatio * heightRatioSize - target.height() / 2) * (-1));
    target.css({ backgroundPosition: leftPos + 'px ' + topPos + 'px' });
	
	//Устанавливаем позицию лупы
	leftPos2 = String((x*1 * widthRatioSize + rectCanvas.left) - target.width() / 2 + window.pageXOffset + pageX);
    topPos2 = String((y*1 * heightRatioSize + rectCanvas.top)  - target.height() / 2 + window.pageYOffset + pageY);
    target.css({ left: leftPos2 + 'px', top: topPos2 + 'px' });
}

//Функция скрывающая лупу
function hideLoop_script()
{
	var target=$('.loop');
	target.hide();
}

//Продолжение создания лупы на jqery
$.fn.imageLens = function (heightRatioSize) 
	{
        //Опции для лупы по умолчанию
		var defaults = 
		{
            lensSize: 100*heightRatioSize,
            borderSize: 2,
            borderColor: "#000"
        };
        var options = $.extend(defaults);
		//Неизменные свойства лупы
        var lensStyle = "background-position: 0px 0px;width: " + String(options.lensSize) + "px;height: " + String(options.lensSize)
            + "px; left:0px; top:0px; float: left;display: none;border-radius: " + String(options.lensSize / 2 + options.borderSize)
            + "px;border: " + String(options.borderSize) + "px solid " + options.borderColor 
            + ";background-repeat: no-repeat;position: absolute;";

		//
        return this.each(function () {
            obj = $(this);

            // Создание линзы
            var target = $("<div style='" + lensStyle +"' class='" + 'loop' + "'>&nbsp;</div>").appendTo($("body"));
            var targetSize = target.size();

			//Создание картинки в линзе
			if (canvasLoop.getContext)
			{
				var imageSrc=canvasLoop.toDataURL("image/png");
				var newLoopPicture = document.createElement('img');
				newLoopPicture.setAttribute('class', 'loopimg');
				newLoopPicture.setAttribute('src', imageSrc);
				newLoopPicture.setAttribute('style', 'display:none');
				slide.appendChild(newLoopPicture);
			}
            var widthRatio = 0;
            var heightRatio = 0;
			//Загрузка картинки и отношений размеров
            $('.loopimg').load(function () 
			{
                widthRatio = $(this).width() / obj.width();
                heightRatio = $(this).height() / obj.height();
            }).appendTo($(this).parent());
            target.css({ backgroundImage: "url('" + imageSrc + "')" });
        });
    };

function createAction(startAction,finishAction)
{
	//alert(startAction +' '+ finishAction);
	for (var i=startAction; i<=finishAction;i++)
	{
		if(cart2.line[i].action=='3DAction')
		{
			draw_3D(i);
		}
		else if(cart2.line[i].action=='dropSlide')
		{
			dropSlide_script();
		}
		else
		{
			var widthRatioSize=canvas.offsetWidth/cart2.line[i].width;
			var heightRatioSize=canvas.offsetHeight/cart2.line[i].height;
		}
		if (cart2.line[i].action=='paint')
		{
			draw_line_script(i,widthRatioSize,heightRatioSize);
		}
		else if(cart2.line[i].action=='clear')
		{
			clearBorder_script();
		}
		else if(cart2.line[i].action=='createLoop')
		{
			createLoop_script(i,heightRatioSize);
		}
		else if(cart2.line[i].action=='deleteLoop')
		{
			if ($("div").is(".loop"))
			{		
				deleteLoop_script();
			}
		}
		else if(cart2.line[i].action=='loop')
		{
			positionLoop_script(i,widthRatioSize,heightRatioSize);
		}
		else if(cart2.line[i].action=='hideLoop')
		{
			hideLoop_script();
		}
	}
}

function action (numberSlide)
{
	var startAction;
	var timeStart;
	if (lastSlide!=numberSlide || deltaTime<0)
	{
		//Удаляем лупу
		if ($("div").is(".loop"))
		{		
			deleteLoop_script();
		}
		//Вычисляем стартовое действие
		for (var i=0; i<cart.slide.length; i++)
		{
			if (cart.slide[i].id==numberSlide)
			{
				timeStart=cart.slide[i].time;
				break;
			}
		}
		for (var i=0; i<cart2.line.length; i++)
		{
			if (cart2.line[i].time>=timeStart)
			{
				startAction=i;
				break;
			}
		}
	}
	else 
	{
		startAction=lastAction+1;
	}
	lastSlide=numberSlide;
	//Вычисляем последнее действие
	for (var i=0; i<cart2.line.length; i++)
	{
		if (cart2.line[cart2.line.length-1].time<=video.currentTime)
		{
			var finishAction=i;
		}
		else if (cart2.line[i].time>video.currentTime)
		{
			var finishAction=i-1;
			break;
		}
	}
	//Если есть действия
	if (finishAction>=startAction)
	{
		createAction(startAction,finishAction);
	}
	//Запоминаем последнее действие
	lastAction=finishAction;
}