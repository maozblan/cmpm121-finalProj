class_name weather extends Node2D

var noise := FastNoiseLite.new();
var step := 0;
var w: int;
var h: int;

const MAX_SUN := 10;
const MAX_RAIN := 10;
const NOISE_SHIFT := -20;

func _init(width: int, height: int) -> void:
	self.w = width;
	self.h = height;
	self.noise.fractal_gain = 0.25;

func _calcResource(val: int) -> Dictionary:
	const MAX := 255.0;
	var sun := 0;
	var rain := 0;
	if ((val / MAX) >= 0.8):
		sun = MAX_SUN;
	elif ((val / MAX) >= 0.6):
		sun = int(MAX_SUN * 0.7);
		rain = int(MAX_RAIN * 0.3);
	elif ((val / MAX) >= 0.4):
		sun = int(MAX_SUN * 0.3);
		rain = int(MAX_RAIN * 0.7);
	else:
		rain = MAX_RAIN;
	return {"sun": sun, "rain": rain}

func _calcAllResources(data: Array):
	var resources := [[]];
	for cell in data:
		if (len(resources[len(resources)-1]) == self.w):
			resources.push_back([]);
		resources[len(resources)-1].push_back(self._calcResource(cell));
	print(resources);
	return resources;

func next():
	return setStep(self.step + 1);

func last():
	return setStep(self.step - 1);

func setStep(s: int):
	self.step = s;
	self.noise.offset = Vector3(s * NOISE_SHIFT, s * NOISE_SHIFT, 0);
	return self._calcAllResources(noise.get_image(self.w, self.h).get_data())
