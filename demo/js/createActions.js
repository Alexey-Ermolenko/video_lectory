
lastSlide='NULL';
var startAction=0;
var lastAction=-1;
var statusLoop=0;
var statusSlide=true;

function action(numberSlide, demoTypeName)	{
	var startAction;
	var timeStart;
	if (lastSlide!=numberSlide || deltaTime<0)	{
	//Удаляем лупу
	//	if ($("div").is(".loop"))
	//	{		
	//		deleteLoop_script();
	//	}
		//Вычисляем стартовое действие
		for (var i=0; i<cart.slides.length; i++)	{
			if (cart.slides[i].id==numberSlide)
			{
				timeStart=cart.slides[i].time;
				break;
			}
		}
		for (var i=0; i<cart2.commands.length; i++)	{
			if (cart2.commands[i].time>=timeStart)	{
				startAction=i;
				break;
			}
		}
	}	else 	{
		startAction=lastAction+1;
	}
	lastSlide=numberSlide;
	//Вычисляем последнее действие
	for (var i=0; i<cart2.commands.length; i++)	{
		if (cart2.commands[cart2.commands.length-1].time<=video.currentTime)	{
			var finishAction=i;
		}
		else if (cart2.commands[i].time>video.currentTime)	{
			var finishAction=i-1;
			break;
		}
	}
	//Если есть действия
	if (finishAction>=startAction)	{
		//функция воспроизведения команд описывается в подключаемом файле-функций демонстрационного объекта
		
		code_string = "createAction_" + demoTypeName + "(" + startAction + "," + finishAction + ")";
		eval(code_string);
	}
	//Запоминаем последнее действие
	lastAction=finishAction;
}