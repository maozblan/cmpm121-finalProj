extends Sprite2D

@export var tile_map: Node2D;
@onready var sprite_2d = $Sprite2D

var is_moving = false;

func _physics_process(delta: float):
	if is_moving == false:
		return
	
	if global_position == sprite_2d.global_position:
		is_moving = false
		return
	
	sprite_2d.global_position = sprite_2d.global_position.move_toward(global_position, 1)

func _ready():
	move(Vector2.ZERO);
# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float):
	if is_moving:
		return
	
	if Input.is_action_pressed("up"):
		move(Vector2.UP)
	elif Input.is_action_pressed("left"):
		move(Vector2.LEFT)
	elif Input.is_action_pressed("right"):
		move(Vector2.RIGHT)
	elif Input.is_action_pressed("down"):
		move(Vector2.DOWN)

func move(direction: Vector2):
	#get current tile Vector2i
	var current_tile: Vector2i = tile_map.local_to_map(global_position)

	#Get target tile Vector2i
	var target_tile: Vector2i = Vector2i(
		current_tile.x + direction.x,
		current_tile.y + direction.y,
	)

	#Get custom data layer from target tile
	#var tile_data: TileData = tile_map.get_cell_tile_data(0, target_tile)
	
	#if tile_data.get_custom_data("walkable") == false:
		#return
	#Move player
	is_moving = true
	
	global_position = tile_map.map_to_local(target_tile)
	
	sprite_2d.global_position = tile_map.map_to_local(current_tile)


func plant_seed():
	tile_map.place_plant(tile_map.local_to_map(global_position));

func reap_plant():
	tile_map.reap_plant(tile_map.local_to_map(global_position));
