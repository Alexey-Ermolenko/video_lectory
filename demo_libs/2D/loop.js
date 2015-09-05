//var canvasLoop = document.getElementById('canvasLoop');
var oldStrokeStyle;
var statusLoop;
//����������� �������� ���� �� jqery
$.fn.imageLens = function (heightRatioSize) 
	{
		//console.log(" - -  - -  - -  - - - -imageLens  heightRatioSize = " + heightRatioSize );
        //����� ��� ���� �� ���������
		var defaults = 
		{
            lensSize: 180*heightRatioSize,
            borderSize: 2,
            borderColor: "#000"
        };
        var options = $.extend(defaults);
		//���������� �������� ����
        var lensStyle = "background-position: 0px 0px;width: " + String(options.lensSize) + "px;height: " + String(options.lensSize)
            + "px; left:0px; top:0px; float: left;display: none;border-radius: " + String(options.lensSize / 2 + options.borderSize)
            + "px;border: " + String(options.borderSize) + "px solid " + options.borderColor 
            + ";background-repeat: no-repeat;position: absolute;";

		//
        return this.each(function () {
            obj = $(this);

            // �������� �����
            var target = $("<div style='" + lensStyle +"' class='" + 'loop' + "'>&nbsp;</div>").appendTo($("body"));
            var targetSize = target.size();

			//�������� �������� � �����
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
			//�������� �������� � ��������� ��������
            $('.loopimg').load(function () 
			{
                widthRatio = $(this).width() / obj.width();
                heightRatio = $(this).height() / obj.height();
            }).appendTo($(this).parent());
            target.css({ backgroundImage: "url('" + imageSrc + "')" });
        });
    };