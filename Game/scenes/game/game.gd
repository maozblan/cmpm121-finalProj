extends Node2D

@onready var map = $Map
@onready var player = $Player
# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass


func _input(event):
	# debug
	if event is InputEventMouseButton:
		player.plant_seed();
	if event.is_action_pressed("NextTurn"):
		nextTurn();


# process next turn
func nextTurn():
	print("next turn");
	map.next_turn();
