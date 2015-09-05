/* _2D  Последний слайд типа "доска" */
				if (((cart.slides[i].time <= x) && (numberSlide!=cart.slides[i].id) && (cart.slides[i].type == '2D')) || ((cart.slides[i].time <= x) && (statusSlide==false) && (deltaTime<0) && (cart.slides[i].type == '2D')))
				{
					slide.innerHTML = '';
					var newCanvas = document.createElement('canvas');
					newCanvas.setAttribute('id', 'blackboard');
					slide.appendChild(newCanvas);
					var backgroundBoard = cart.slides[i].src;		
					//console.log("timeVideo 2D blackboard");
					
							$("#canvasPreload").remove();
							$('body').append('<canvas id="canvasPreload"></canvas>');	
							$("#canvasPreload").css("display", "none");
					
					load_2D(backgroundBoard);

					if (statusSlide==false)
					{
						statusSlide=true;
					}
					
					borderSlide(i);
					numberSlide=cart.slides[i].id;
					action(numberSlide, cart.slides[i].type);
					
				}
				//Последний слайд типа "доска" при перемотке
				else if ((cart.slides[i].time <= x) && (deltaTime<0) && (cart.slides[i].type == '2D')) 
				{
					slide.innerHTML = '';
					var newCanvas = document.createElement('canvas');
					newCanvas.setAttribute('id', 'blackboard');
					slide.appendChild(newCanvas);
					var backgroundBoard = cart.slides[i].src;		
							$("#canvasPreload").remove();
							$('body').append('<canvas id="canvasPreload"></canvas>');	
							$("#canvasPreload").css("display", "none");
					
					load_2D(backgroundBoard);

					//borderSlide(i);
					//numberSlide=cart.slide[i].id;
					action(numberSlide, cart.slides[i].type);
					
				}