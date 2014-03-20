TODOs

* Bind time back to a player. Millis/seconds/minutes/hours/days
    * playTime will then be used to filter the view, highest time to the top

* When a timer starts on ANY player, it should update an array of playersPlaying and raise an event that can be listened to.
    *if playersPlaying, if the count is > 0 update the global Play/pause button to show PAUSE. if the count is 0, update the Play/pause to Play

* Global Pause, pause all player who are playing.
