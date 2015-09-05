/* _3D */

				//Последний слайд типа "3D"
				else if (((cart.slides[i].time <= x)  && (numberSlide!=cart.slides[i].id) && (cart.slides[i].type == '3D'))||((cart.slides[i].time <= x) && (statusSlide==false)  && (deltaTime<0) && (cart.slides[i].type == '3D')) )
				{
					slide.innerHTML = '';
					superX=0;
					superY=0;
					superZ=0;
					var objectPathJSON = cart.slides[i].obj,
						texturePathPNG = cart.slides[i].texture;
						bgTexturePath = "";

					var objContainer = document.getElementById('slide');
					
					if (statusSlide==false)
					{
						statusSlide=true;
					}
					borderSlide(i);
					numberSlide=cart.slides[i].id;
					load_3D(objContainer, objectPathJSON, texturePathPNG);
					action(numberSlide, cart.slides[i].type);
					
				}
				//Последний слайд типа "3D" при перемотке
				else if ((cart.slides[i].time <= x)  && (deltaTime<0) && (cart.slides[i].type == '3D')) 
				{
					superX=0;
					superY=0;
					superZ=0;
					action(numberSlide);
				}
				else
				{
					//Выполнение действия
					if (endAction==false)
					{
						action(numberSlide, cart.slides[i].type);
						
						
						endAction=true;
					}
				}
