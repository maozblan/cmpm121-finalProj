class_name Map extends Node2D
@onready var ground_layer = $GroundTileLayer
@onready var plant_layer = $PlantTileLayer
@export var size = 10;

enum PlantTypes {
	WHEAT,
	FLOWER
}

var weather:Weather = Weather.new(size, size);
var water_levels: Array[Array] = []
var plants:Dictionary = {};
var total_score:
	get:
		var count = 0;
		for key in plants.keys():
			count += plants[key].get_points()
		return count;

# Called when the node enters the scene tree for the first time.
func _ready():
	for i in range(size):
		water_levels.append([])
		for j in range(size):
			water_levels[i].append(0)

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass

func get_cell_sunlight(cord:Vector2i) -> int:
	return weather.get_cell_resource(cord).sun;
	pass;

func get_cell_water(cord:Vector2i) -> int:
	return water_levels[cord.x][cord.y];

func set_cell_water(cord:Vector2i, water_level):
	water_levels[cord.x][cord.y] = water_level;

func get_cell_plant(cord:Vector2i):
	if cord_to_key(cord) in plants.keys():
		return plants[cord_to_key(cord)];
	return null;

func get_surrounding_cells(cord:Vector2i):
	return ground_layer.get_surrounding_cells(cord);

func local_to_map(cord:Vector2i):
	return ground_layer.local_to_map(cord)

func map_to_local(cord:Vector2i):
	return ground_layer.map_to_local(cord);

# may need to adjust parameters to choose right plant
func place_plant(cord:Vector2i, plant_type: PlantTypes) -> void:
	var plant;
	match plant_type:
		PlantTypes.WHEAT:
			plant = Wheat.new(cord, self);
		PlantTypes.FLOWER:
			plant = Flower.new(cord, self);
		_:
			plant = Flower.new(cord, self);
			print("invalid plant type");
	if ground_layer.get_cell_source_id(cord) == -1:
		return;
	if cord_to_key(cord) in plants.keys():
		print("already planted " + cord_to_key(cord));
		return;
	plant_layer.set_cell(cord, 0, plant.current_tile, 0);
	plants[cord_to_key(cord)] = plant;

func reap_plant(cord:Vector2i):
	if plant_layer.get_cell_source_id(cord) == -1:
		print("no plant to reap");
		return null;
	
	plant_layer.set_cell(cord, -1);
	var plant = plants[cord_to_key(cord)];
	plants.erase(cord_to_key(cord));
	#plant.free();


func cord_to_key(cord) -> String:
	return str(cord.x) + ", " + str(cord.y);


func next_turn(): 
	grow_plants();
	update_water();
	weather.next();

func update_water():
	var resources = weather.resources;
	for i in range(size):
		for j in range(size):
			water_levels[i][j] += resources[i][j].rain;

func grow_plants():
	for key in plants.keys():
		var plant = plants[key];
		plant.grow(); # still also need sun/rain system
		if key in plants:
			plant_layer.set_cell(plant.pos, 0, plant.current_tile, 0);
	weather.next();
