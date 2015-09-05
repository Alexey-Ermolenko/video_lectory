document.getElementById("loop").onclick=loop;
var canvasLoop;
var oldStrokeStyle;
var statusLoop;
//var statusHideLoop;

function deleteLoop()
{
	statusLoop=false;
	//Удаляем лупу и картинку для неё
	$("div.loop").remove()
	$("img.loopimg").remove()
	sendDeleteLoop();
}

function loop()
{
	//Проверяем создана ли уже лупа
    if (statusAction==2)
	{
		deleteLoop();
		ctx.strokeStyle=oldStrokeStyle;
		statusAction=1;
	}
	else
	{
		statusAction=2;
		//AJAX
		sendCreateLoop();
		statusLoop=true;
		//Сохраняем цвет маркера
		oldStrokeStyle=ctx.strokeStyle;
		if (canvas.getContext) 
		{
			//Заполнение canvas для лупы
			canvasLoop = document.getElementById("canvasLoop");
			var ctxL = canvasLoop.getContext('2d');
			var picL = new Image();
			picL.src = canvas.toDataURL("image/png");
			canvasLoop.width=canvas.width*2;
			canvasLoop.height=canvas.height*2;
			//Получение картинки из canvas для лупы
			picL.onload=function()
			{
				var yL= canvasLoop.height;
				var xL= canvasLoop.width;
				ctxL.drawImage(picL, 0, 0, xL, yL);
				$("#blackboard").imageLens();
			}
		}
	}
}

$.fn.imageLens = function () 
	{
        //Опции для лупы по умолчанию
		var defaults = 
		{
            lensSize: 100,
            borderSize: 2,
            borderColor: "#000"
        };
        var options = $.extend(defaults);
		//Неизменные свойства лупы
        var lensStyle = "background-position: 0px 0px;width: " + String(options.lensSize) + "px;height: " + String(options.lensSize)
            + "px;float: left;display: none;border-radius: " + String(options.lensSize / 2 + options.borderSize)
            + "px;border: " + String(options.borderSize) + "px solid " + options.borderColor 
            + ";background-repeat: no-repeat;position: absolute;";

		//
        return this.each(function () {
            obj = $(this);
            var offset = $(this).offset();

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
			//При движении мыши в слайде
            target.mousemove(setPosition);
            $(this).mousemove(setPosition);
			//Определение позиций
            function setPosition(e) {
				
				var leftPos = parseInt(e.pageX - offset.left);
				var topPos = parseInt(e.pageY - offset.top);
				
				//Есди вышли за пределы слайда
                if (leftPos < 0 || topPos < 0 || leftPos > obj.width() || topPos > obj.height()) {
                    target.hide();
					sendHideLoop();
                }
				//В слайде
                else 
				{
					//Позиция изображения в лупе
					var leftPos2;
					var topPos2;
                    target.show();
                    leftPos = String(((e.pageX - offset.left) * widthRatio - target.width() / 2) * (-1));
                    topPos = String(((e.pageY - offset.top) * heightRatio - target.height() / 2) * (-1));
                    target.css({ backgroundPosition: leftPos + 'px ' + topPos + 'px' });
					
					//Позиция лупы
                    leftPos2 = String(e.pageX - target.width() / 2);
                    topPos2 = String(e.pageY - target.height() / 2);
                    target.css({ left: leftPos2 + 'px', top: topPos2 + 'px' });
					//От избыточности
					if (statusAction==2)
					{
						sendLoopAction (e.pageX - offset.left,e.pageY - offset.top);
					}
                }
            }
        });
    };