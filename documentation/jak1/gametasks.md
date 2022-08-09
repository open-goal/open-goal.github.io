---
sidebar_position: 0
description:
---

# Game Tasks

A full list of game tasks in Jak 1 can be found in 
<u>[`game-task-h.gc`](https://github.com/open-goal/jak-project/blob/master/goal_src/jak1/engine/game/task/game-task-h.gc)</u>.

Each game task is numbered and passed as an attribute of an <u>[actor]()</u> associated with an in game event which in turn has its logic controlled by 
<u>[`task-control.gc`](https://github.com/open-goal/jak-project/blob/master/goal_src/jak1/engine/game/task/task-control.gc)</u>.

You can see as an example the following game logic (approx line 1045) which controls the first oracle's power cells found in Sandover Village.

```
(define *oracle-village1-tasks*
  (new 'static 'task-control
    :current-stage -1
    :stage (new 'static 'boxed-array :type task-cstage
```

Here we define a list of tasks which the player will complete for the oracle in order to progress the game.

```
(new 'static 'task-cstage
        :game-task (game-task village1-oracle-money1)
        :status (task-status need-hint)
        :flags (task-flags has-entity closed-by-default)
        :condition (lambda :behavior process-taskable ((arg0 task-control)) #t)
        )
```

Then, each stage of each task is listed in the order they should be presented to the player. Here, `village1-oracle-money1` is the first power cell the player
can purchase from the oracle. Its status is updated throughout the game:

- `need-hint` a character, Daxter in this case, informs the player of the mission by playing a hint audio
- `need-introduction` when the player initially talks to the oracle, a cutscene will play
- `need-reward-speech` when the player speaks to the oracle and doesn't have the necessary orbs, a different cutscene will play
- `need-reminder` a character provides a reminder that the mission is not yet completed
- `need-resolution` a character provides a reminder that the mission is completed and they need to return to the oracle

You can see in the file that the statuses only have to be in order by game task. The first two statuses for both of the oracles' power cells are declared
first, even though the second power cell can only be received after the first.

Not all game tasks have the same status list. Looking through 
<u>[`task-control.gc`](https://github.com/open-goal/jak-project/blob/master/goal_src/jak1/engine/game/task/task-control.gc)</u>,
we can see several other options such as:

- `unknown` the player will not be provided a hint
- `need-reminder-a` the player needs to complete an intermediate task (such as hatching the flutflut) before continuing
- `invalid` no hint status provided

# Actors

Since certain actors are passed a game task number as an attribute, they are able to update the status of a game task by being collected. For instance, when
the player collects a certain power cell, the game task it is associated with will likely set its status to `need-resolution` and then the power cell's game
task number will be updated to 1, `complete`.

# Useful REPL Commands
-`TODO`
