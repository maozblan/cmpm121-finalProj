extends Node2D
@onready var ground_layer = $GroundTileLayer
@onready var plant_layer = $PlantTileLayer
var water_levels:Dictionary = {};
var plants:Dictionary = {};

# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass

func get_cell_sunlight(cord:Vector2i):
	pass;

func get_cell_water(cord:Vector2i):
	return water_levels[cord_to_key(cord)];

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
func place_plant(cord:Vector2i, plant:Plant):
	if ground_layer.get_cell_source_id(cord) == -1:
		return null;
	if cord_to_key(cord) in plants.keys():
		print("already planted " + cord_to_key(cord));
	plant_layer.set_cell(cord, 0, Vector2i(3, 8), 0);
	plants[cord_to_key(cord)] = plant;

func cord_to_key(cord) -> String:
	return str(cord.x) + ", " + str(cord.y);

func grow_plants():
	for key in plants.keys:
		print("plant at: " + key + " is growing");
		#plants[key].grow(); # still also need sun/rain system
