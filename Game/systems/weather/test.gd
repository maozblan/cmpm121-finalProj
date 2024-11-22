extends Node2D

var noise
var texture
var v

var w
# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	v = Vector3(0, 0, 0)
	noise = FastNoiseLite.new()
	noise.fractal_gain = 0.25
	texture = NoiseTexture2D.new()
	texture.noise = noise
	print('sample noise ', noise.get_image(3, 3, false, false, false).get_data())
	$TextureRect.texture = texture;
	w = Weather.new(3, 3);

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	if (Input.is_action_just_pressed("ui_down")):
		updateNoise();
	if (Input.is_action_just_pressed("ui_accept")):
		print(w.next());
		print(w.getCellResource(Vector2(1, 2)));

func updateNoise() -> void:
	print('updating noise ', noise.get_image(3, 3, false, false, false).get_data())
	var a = -20
	v = v + Vector3(a, a, 0)
	noise.offset = v
	texture.noise = noise
	await texture.changed
	$TextureRect.texture = texture;
	var image = texture.get_image()
	var data = image.get_data()
