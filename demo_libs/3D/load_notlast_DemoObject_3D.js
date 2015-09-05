/* _3D  Не последний слайд типа "3D"  */
				if (((cart.slides[i].time <= x) && (cart.slides[i + 1].time > x) && (numberSlide!=cart.slides[i].id) && (cart.slides[i].type == '3D')) || ((cart.slides[i].time <= x) && (cart.slides[i + 1].time > x) && (statusSlide==false) && (deltaTime<0) && (cart.slides[i].type == '3D'))) 
				{
						//console.log("//Если слайд не последний   //Слайд типа 3D");
						slide.innerHTML = '';
						superX=0;
						superY=0;
						superZ=0;
						
					/*	
						var objectPathJSON = cart.slide[i].obj,
							texturePathPNG = cart.slide[i].texture;
							bgTexturePath = "";

						var objContainer = document.getElementById('slide');

						var object = new obj2web(objContainer, objectPathJSON, texturePathPNG, bgTexturePath);

						object.setDistanceInterval(500, 500);
						object.setInitPosition(0, 15, 0);
					*/	
						var objContainer = document.getElementById('slide');
						var objectDemoObject = cart.slides[i].obj;
						var textureDemoObject = cart.slides[i].texture;
						
						load_demo_3D(objContainer, objectDemoObject, textureDemoObject);
						
						if (statusSlide==false)
						{
							statusSlide=true;
						}
						
						//object.animate();
						borderSlide(i);
						numberSlide = cart.slides[i].id;
						action(numberSlide, cart.slides[i].type);
				}
				//Cлайд типа "3D" при перемотке
				else if ((cart.slides[i].time <= x) && (cart.slides[i + 1].time > x) && (deltaTime<0) && (cart.slides[i].type == '3D')) 
				{
						//console.log("//Если слайд не последний   //Слайд типа 3D  при перемотке");
						superX=0;
						superY=0;
						superZ=0;
						action(numberSlide, cart.slides[i].type);	
				}