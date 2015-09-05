/* _2D  Не последний слайд типа "доска"  */
				if (((cart.slides[i].time <= x) && (cart.slides[i + 1].time > x) && (numberSlide!=cart.slides[i].id) && (cart.slides[i].type == '2D')) || ((cart.slides[i].time <= x) && (cart.slides[i + 1].time > x) && (statusSlide==false) && (deltaTime<0) && (cart.slides[i].type == '2D'))) 
				{
								console.log("//Если слайд не последний   //Слайд типа доска");
								slide.innerHTML = '';
								var newCanvas = document.createElement('canvas');
								newCanvas.setAttribute('id', 'blackboard');
								slide.appendChild(newCanvas);
								var canvas=document.getElementById('blackboard');
								var backgroundBoard = cart.slides[i].src;
								
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
				//Cлайд типа "доска" при перемотке
				else if ((cart.slides[i].time <= x) && (cart.slides[i + 1].time > x) && (deltaTime<0) && (cart.slides[i].type == '2D')) 
				{
							console.log("//Если слайд не последний   //Слайд типа доска  при перемотке");
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
				} else {
					//Выполнение действия
					if (endAction==false)	{
							action(numberSlide, cart.slides[i].type);
							endAction=true;
					}
				}