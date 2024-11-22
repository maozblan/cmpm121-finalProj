class_name Weather extends Node2D

var noise := FastNoiseLite.new();
var step := 0;
var resources;
var w: int;
var h: int;

const MAX_SUN := 10;
const MAX_RAIN := 10;
const NOISE_SHIFT := -20;

func _init(width: int, height: int) -> void:
	self.w = width;
	self.h = height;
	self.noise.fractal_gain = 0.25;
	self.resources = set_step(self.step);
	self.resources = set_step(self.step);

func _calc_resource(val: int) -> Dictionary:
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

func _calc_all_resources(data: Array):
	var r := [[]];
	for cell in data:
		if (len(r[len(r)-1]) == self.w):
			r.push_back([]);
		r[len(r)-1].push_back(self._calc_resource(cell));
		r[len(r)-1].push_back(self._calc_resource(cell));
	self.resources = r;
	return r;

func next():
	return set_step(self.step + 1);
	return set_step(self.step + 1);

func last():
	return set_step(self.step - 1);
	return set_step(self.step - 1);

func set_step(s: int):
	self.step = s;
	self.noise.offset = Vector3(s * NOISE_SHIFT, s * NOISE_SHIFT, 0);
	return self._calc_all_resources(noise.get_image(self.w, self.h).get_data())
	return self._calc_all_resources(noise.get_image(self.w, self.h).get_data())

func get_cell_resource(coord: Vector2i):
	assert(coord.x < self.w && coord.y < self.h)
	return self.resources[coord.x][coord.y];
