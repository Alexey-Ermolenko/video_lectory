var superX=0;
var superY=0;
var superZ=0;

obj2web = function(container, objPath, texturePath, bgTexturePath){

	/*описание переменных*/
	var camera,																				
		scene,																				
		renderer,																			
		loader,																				
		pointLightSources = {},																
		ambientLight,
		loadComplete = false,																
		animating = false,
		texture,																			
		material,																			
		object;																				

	var	backgroundGeometry,																	
		backgroundMaterial,																	
		backgroundRadius,																	
		backgroundTexture,																	
		background;																			

	var	width = container.clientWidth,														
		height = container.clientHeight,													
		viewAngle = 30,																		
		aspect = width / height,															
		near = 0.1,																			//ближняя граница отрисовки
		far = 1000000;																		//дальняя граница отрисовки

	var distance = 1000,																	//расстояние от камеры до объекта
		distanceMin = 2,																	//минимальная дистанция приближения камеры
		distanceMax = 10,																	//максимальная дистанция приближения камеры
		distanceTarget = initDistanceTarget(),												//целевое расстояние от камеры до объекта
		zoomSpeed = 0.05,																	//скорость приближения
		rotation = {x:0, y:0},																//углы поворота объекта
		rotationTarget = {x:Math.PI/2, y:Math.PI/2},										//целевые углы поворота объекта
		mouseDown = {x:0, y:0},																//точка зажатия левой кнопки мыши
		mouse = {x:0, y:0},																	//текущее положение мыши при зажатой левой клавише
		touchStart = {x:0, y:0},															//точка касания тачскрина
		touch = {x:0, y:0},																	//текущее положение касания тачскрина
		delta = {x:0, y:0, alphaX:0, alphaY:0},												//разница mouseDown и mouse, delta.alpha разницы углов
		deltaTouch = {x:0, y:0, alphaX:0, alphaY:0},
		rotationSpeed = 0.2,																//скорость вращения камеры
		rotationSensitivity = 0.05,															//чувствительность вращения
		rotationSensitivityTouch = 0.05,													//чувствительность вращения
		initRotationNeedIndicator = false,													//индикатор необходимости изменить начальное вращение объекта
		initRotation = {x:0, y:0, z:0},														//объект для сохранения необходимого начального вращения
		initPositionNeedIndicator = false,													//индикатор необходимости изменить начальное положение объекта
		initPosition = {x:0, y:0, z:0};														//объект для сохранения необходимого начального положения

	var loadingBar = {removed:false},
		i = 0;

	loadingBar.removed = false;

	/*создание объекта и всего необходимого*/
	scene = new THREE.Scene();																//создание сцены

	camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);						//создание камеры

	renderer = new THREE.WebGLRenderer({ alpha: true });									//создание рендерера
	renderer.setClearColor(0x000000, 0);
	renderer.setSize(width,height);															//размеры рендерера
	container.appendChild(renderer.domElement);

	loadingBar = document.createElement('div');
	loadingBar.id = 'loading_bar';
	loadingBar.innerHTML = 'LOADING';
	loadingBar.style.color = '#ffffff';
	loadingBar.style.fontWeight = 'bold';
	loadingBar.style.fontSize = height/10 + 'px';
	loadingBar.style.position = 'absolute';
	loadingBar.style.textAlign = 'center';
	loadingBar.style.margin = 'auto';
	loadingBar.style.marginTop = -height/2 - height/20 + 'px';
	loadingBar.style.width = width + 'px';
	container.appendChild(loadingBar);

	/*fullScreenBtn = document.createElement('div');
	fullScreenBtn.id = 'full_screen_btn';
	fullScreenBtn.style.width = '50px';
	fullScreenBtn.style.height = '50px';
	fullScreenBtn.style.position = 'absolute';
	fullScreenBtn.style.background = '#000000';
	fullScreenBtn.style.marginTop = -height + 'px';
	fullScreenBtn.style.marginLeft = width - 55 + 'px';
	container.appendChild(fullScreenBtn);*/

	loader = new THREE.JSONLoader();
	var callbackTrax = function(geometry, objMaterial){									//ф-я выполняемая по окончанию загрузки
		if(texturePath){
			texture = new THREE.ImageUtils.loadTexture(texturePath);
			material = new THREE.MeshBasicMaterial({map:texture});
		}
		else{
			material = new THREE.MeshFaceMaterial(objMaterial);
		}
		object = new THREE.Mesh(geometry, material);									//создание объекта с геометрией geometry из mdterial
		scene.add(object);																//добавляем объект к сцене
		loadComplete = true;

/****************************************************************************************************************************************
		geometry.computeBoundingSphere();
		boundingSphereRadius = geometry.boundingSphere.radius;
		console.log(boundingSphereRadius);
		boundingGeometry = new THREE.SphereGeometry(1, 100, 100);
		boundingMaterial = new THREE.MeshBasicMaterial({color:0xff00ff})
		bounding = new THREE.Mesh(boundingGeometry, boundingMaterial);
		scene.add(bounding);
		
*****************************************************************************************************************************************/

		if (initRotationNeedIndicator) {
			setInitRotation(initRotation.x, initRotation.y, initRotation.z);
		};
		if (initPositionNeedIndicator) {
			setInitPosition(initPosition.x, initPosition.y, initPosition.z);
		};
	}
	loader.load(objPath, callbackTrax);													//загрузка объекта

	function animateLoading() {
		if (loadComplete && !loadingBar.removed) {
			loadingBar.removed = true;
			container.removeChild(loadingBar);
		}
		else {
			if (i < 4) {
				loadingBar.innerHTML = loadingBar.innerHTML + '.';
				i++;
				if (!loadComplete && !loadingBar.removed) {
					setTimeout(animateLoading, 100);
				}
			};
			if (i >= 4) {
				loadingBar.innerHTML = 'LOADING';
				i = 0;
				if (!loadComplete && !loadingBar.removed) {
					setTimeout(animateLoading, 100);
				}
			};
		}	
	}

	animateLoading();

	if (bgTexturePath) {
		backgroundTexture = THREE.ImageUtils.loadTexture(bgTexturePath);
		backgroundGeometry = new THREE.SphereGeometry(100000, 100, 100);
		backgroundMaterial = new THREE. MeshBasicMaterial({map: backgroundTexture});
		backgroundMaterial.side = THREE.BackSide;
		background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
		scene.add(background);
	}else
	{
		backgroundGeometry = new THREE.SphereGeometry(100000, 100, 100);
		backgroundMaterial = new THREE.MeshBasicMaterial();
		backgroundMaterial.transparent = true;
		backgroundMaterial.opacity = 0.0;
		backgroundMaterial.side = THREE.BackSide;
		background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
		scene.add(background);
	}

    container.addEventListener('mousewheel', onMouseWheel, false);							//события зума
    container.addEventListener('mousedown', onMouseDown, false);							//событие попытки вращать камеру
    container.addEventListener('touchstart', onTouchStart, false);
	
	/*описание приватных методов класса*/
	function initDistanceTarget(){															//функция расчета дистанции до объекта по умолчанию
		return distanceMin + (distanceMax - distanceMin) / 2
	}

	function onMouseWheel(event){															//обработчик события вращени колеса мыши
		event.preventDefault();																//отмена действия браузера поумолчанию
		zoom(event.wheelDeltaY * 0.25);														//делаем zoom
	}

	function zoom(delta){																	//функция осуществляющая приблежение/отдаление камеры
		distanceTarget -= delta;

		distanceTarget = distanceTarget > distanceMax ? distanceMax : distanceTarget;		//ограничение на максимальное отдаление камеры
    	distanceTarget = distanceTarget < distanceMin ? distanceMin : distanceTarget;		//ограничение на максимальное приближение камеры
	}

	function onMouseDown(event){															//обработчик события попытки вращать камеру
		event.preventDefault();
		container.addEventListener('mousemove', onMouseMove, false);						//событие перемещения мыши
		container.addEventListener('mouseup', onMouseUp, false);							//события отпускания кнопки мыши
		container.addEventListener('mouseout', onMouseOut, false);							//на случай если мышь увели за пределы контейнера

		mouseDown.x = event.clientX;														//запоминаем в какой координате по x произошло зажатие левой кнопки мыши
		mouseDown.y = event.clientY;														//запоминаем в какой координате по y произошло зажатие левой кнопки мыши

		container.style.cursor = 'move';													//меняем стиль курсора
	}

	function onTouchStart(event){
		event.preventDefault();
		container.addEventListener('touchmove', onTouchMove, false);
		container.addEventListener('touchend', onTouchEnd, false);
		container.addEventListener('touchleave', onTouchLeave, false);

		touchStart.x = event.touches[0].clientX;
		touchStart.y = event.touches[0].clientY;

		container.style.cursor = 'move';
	}

	function onMouseMove(event){	/*														//обработчик события зажатия левой кнопки мыши
		mouse.x = event.clientX;															//считываем текущее положение мыши по координате x
    	mouse.y = event.clientY;															//считываем текущее положение мыши по координате y

    	delta.x = mouse.x - mouseDown.x;													//разница между координатой нажатия и текущим положением по x
    	delta.y = mouse.y - mouseDown.y;													//разница между координатой нажатия и текущим положением по y
    	delta.y = - delta.y;

    	mouseDown.x = mouse.x;																//обновляем значения относительно которых вычисляем смещение камеры
    	mouseDown.y = mouse.y;

    	delta.alphaX = delta.x * rotationSensitivity;										//высчитываем угол на который необходимо повернуть обзор по x
    	delta.alphaY = delta.y * rotationSensitivity;										//высчитываем угол на который необходимо повернуть обзор по y

    	rotationTarget.x = rotation.x + delta.alphaX;										//вычисление целевого угла поворота при движение мыши вдоль оси x
    	rotationTarget.y = rotation.y + delta.alphaY;										//вычисление целевого угла поворота при движение мыши вдоль оси y

    	rotationTarget.y = rotationTarget.y < 0 ? 0 : rotationTarget.y;						//создание полюса в верхней точке
    	rotationTarget.y = rotationTarget.y > Math.PI ? Math.PI : rotationTarget.y;	*/		//создание полюса в нижней точке
	}

	function onTouchMove(event){
		/*touch.x = event.touches[0].clientX;
		touch.y = event.touches[0].clientY;

		deltaTouch.x = touch.x - touchStart.x;
    	deltaTouch.y = touch.y - touchStart.y;
    	deltaTouch.y = - deltaTouch.y;

    	touchStart.x = touch.x;
    	touchStart.y = touch.y;

    	deltaTouch.alphaX = deltaTouch.x * rotationSensitivityTouch;
    	deltaTouch.alphaY = deltaTouch.y * rotationSensitivityTouch;

    	rotationTarget.x = rotation.x + deltaTouch.alphaX;									//вычисление целевого угла поворота при движение мыши вдоль оси x
    	rotationTarget.y = rotation.y + deltaTouch.alphaY;									//вычисление целевого угла поворота при движение мыши вдоль оси y

    	rotationTarget.y = rotationTarget.y < 0 ? 0 : rotationTarget.y;						//создание полюса в верхней точке
    	rotationTarget.y = rotationTarget.y > Math.PI ? Math.PI : rotationTarget.y;			//создание полюса в нижней точке
	*/}

	function onMouseUp(event) {																//обработчик события отпускания кнопки мыши	
	    container.removeEventListener('mousemove', onMouseMove, false);						//удаляем обработчиков
	    container.removeEventListener('mouseup', onMouseUp, false);
	    container.removeEventListener('mouseout', onMouseOut, false);
	    container.style.cursor = 'auto';													//меняем стиль курсора
	}

	function onTouchEnd(event){
		container.removeEventListener('touchmove', onTouchMove, false);
		container.removeEventListener('touchend', onTouchEnd, false);
		container.removeEventListener('touchleave', onTouchLeave, false);
		container.style.cursor = 'auto';
	}

	function onMouseOut(event) {															//обработчик события выхода курсора мыши за пределы container
		container.removeEventListener('mousemove', onMouseMove, false);						//удаляем обработчиков
	    container.removeEventListener('mouseup', onMouseUp, false);
	    container.removeEventListener('mouseout', onMouseOut, false);
		container.style.cursor = 'auto';													//меняем стиль курсора
	}

	function onTouchLeave(event){
		container.removeEventListener('touchmove', onTouchMove, false);
		container.removeEventListener('touchend', onTouchEnd, false);
		container.removeEventListener('touchleave', onTouchLeave, false);
		container.style.cursor = 'auto';
	}

	function cameraPositionCalculation(){													//функция вычисляющая позицию камеры текущих параметров
		if (loadComplete){

			distance += (distanceTarget - distance) * zoomSpeed;

			rotation.x += (rotationTarget.x - rotation.x)*rotationSpeed;
			rotation.y += (rotationTarget.y - rotation.y)*rotationSpeed;

			camera.position.x = distance * Math.sin(rotation.y) * Math.cos(rotation.x);
			camera.position.y = distance * Math.cos(rotation.y);
			camera.position.z = distance * Math.sin(rotation.y) * Math.sin(rotation.x);
			
			if (superX!=0 && superY!=0 && superZ!=0)
			{
				camera.position.x=superX;
				camera.position.y=superY;
				camera.position.z=superZ;
			}

			camera.lookAt({x:0, y:0, z:0});
			background.rotation.x = camera.rotation.x;
			background.rotation.y = camera.rotation.y;
			background.rotation.z = camera.rotation.z;

		}
	}

	function render() {
		renderer.render(scene, camera);														//собственно отрисовка сцены и камеры
	}

	/*описание публичных методов класса*/
	setTextureRepeat = function(x, y){													//метод задающий растяжения текстуры
		texture.repeat.x = x;
		texture.repeat.y = y;
	}

	setTextureOffset = function(x, y){													//метод задающий смещение текстуры
		texture.offset.x = x;
		texture.offset.y = y;
	}

	addAmbientLight = function(hex){
		ambientLight = new THREE.AmbientLight(hex);
		scene.add(ambientLight);
	}
	
	addPointLightSource = function(nameOfSource, x, y, z, hex, intensity){				//метод добавляющий точечный источник свта с заданными именем, положением, цветом и интенсивностью
		pointLightSources[nameOfSource] = new THREE.PointLight(hex, intensity);				//создание источника заданного цвета и интенсивности внутри объекта pointLightSources с индексом nameOfSource
		pointLightSources[nameOfSource].position.x = x;										//определение положения в пространстве
		pointLightSources[nameOfSource].position.y = y;
		pointLightSources[nameOfSource].position.z = z;
		scene.add(pointLightSources[nameOfSource]);											//добавление источника к сцене
	}

	setInitPosition = function(x, y, z){												//метод позволяющий переместить объект при инициализации
		if (loadComplete == false) {
			initPosition.x = x;
			initPosition.y = y;
			initPosition.z = z;
			initPositionNeedIndicator = true;
		}else
		{
			object.position.set(x, y, z);
		}		
	}

	setInitRotation = function(x, y, z){												//метод позволяющий повернуть объект при инициализации
		if (loadComplete == false) {
			initRotation.x = x;
			initRotation.y = y;
			initRotation.z = z;
			initRotationNeedIndicator = true;
		}else
		{
			object.rotation.set(x, y, z);
		}		
	}

	setInitDistance = function(d){
		distance = d;
	}

	setDistanceTarget = function(target){												//метод позволяющий установить дистанцию до объекта
		distanceTarget = target;

		distanceTarget = distanceTarget > distanceMax ? distanceMax : distanceTarget;		//ограничение на максимальное отдаление камеры
    	distanceTarget = distanceTarget < distanceMin ? distanceMin : distanceTarget;		//ограничение на максимальное приближение камеры
	}

	setDistanceInterval = function(min, max){											//метод позволяющий задать минимальную и максимальную дистанцию до объекта
		distanceMin = min;
		distanceMax = max;
		distanceTarget = initDistanceTarget();
	}


	animate = function (){
		animating = true;
		requestAnimationFrame(animate);														//ф-я, дающая 60fps
		cameraPositionCalculation();
		render();
	}

	this.setTextureRepeat = setTextureRepeat;
	this.setTextureOffset = setTextureOffset;
	this.addAmbientLight = addAmbientLight;
	this.addPointLightSource = addPointLightSource;
	this.setInitPosition = setInitPosition;
	this.setInitRotation = setInitRotation;
	this.setInitDistance = setInitDistance;
	this.setDistanceTarget = setDistanceTarget;
	this.setDistanceInterval = setDistanceInterval;
	this.animate = animate;

	return this;
}