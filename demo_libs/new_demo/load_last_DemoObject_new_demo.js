/* _new_demo  */
//Последний слайд типа "new_demo"
				if (((cart.slides[i].time <= x) && (numberSlide!=cart.slides[i].id) && (cart.slides[i].type == 'new_demo')) || ((cart.slides[i].time <= x) && (statusSlide==false) && (deltaTime<0) && (cart.slides[i].type == 'new_demo')))
				{
					slide.innerHTML = '';
					var newCanvas = document.createElement('canvas');
					newCanvas.setAttribute('id', 'blackboard');
					slide.appendChild(newCanvas);
					var backgroundBoard=cart.slides[i].src;		
					//console.log("timeVideo 2D blackboard");
					load_new_demo(backgroundBoard);
					
					if (statusSlide==false)
					{
						statusSlide=true;
					}
					
					borderSlide(i);
					numberSlide=cart.slides[i].id;
					action(numberSlide, cart.slides[i].type);
				}
				//Последний слайд типа "доска" при перемотке
				else if ((cart.slides[i].time <= x) && (deltaTime<0) && (cart.slides[i].type == 'new_demo')) 
				{
					slide.innerHTML = '';
					var newCanvas = document.createElement('canvas');
					newCanvas.setAttribute('id', 'blackboard');
					slide.appendChild(newCanvas);
					var backgroundBoard=cart.slides[i].src;		
					load_new_demo(backgroundBoard);
					
					borderSlide(i);
					numberSlide=cart.slide[i].id;
					action(numberSlide, cart.slides[i].type);
					
				}