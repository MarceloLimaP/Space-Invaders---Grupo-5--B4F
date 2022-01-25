import React, { Component } from "react";
export class Game extends Component {

    componentDidMount() {
        window.addEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);
    }

    keydown(event) {
        let key = event.key;
        switch (key) {
            case "ArrowRight":
                //Actions.player_key_move(1, 0);
                console.log("->")
                break;
            case "ArrowLeft":
                //Actions.player_key_move(-1, 0);
                console.log("<-")
                break;
            case " ":
                //Actions.player_shoot();
                console.log("shoot")
                break;
            default:
            // no op
        }
    }

    keyup(event) {
        let key = event.key;

        switch (key) {
            case "ArrowRight":
            case "ArrowLeft":
                //Actions.player_stop();
                console.log("stop")
                break;
            default:
            // no op
        }
    }

    render() {

        return "hi"
    }

}