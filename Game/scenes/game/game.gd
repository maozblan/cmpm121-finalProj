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
	if event.is_action_pressed("Action1"):
		player.plant_seed();
	if event.is_action_pressed("Action2"):
		player.reap_plant();
	if event.is_action_pressed("NextTurn"):
		nextTurn();


# process next turn
func nextTurn():
	print("next turn");
	map.next_turn();
	print("points: " + str(map.total_score));
	
	if map.total_score > 25:
		win_game();

func win_game():
	print("You've won!");
