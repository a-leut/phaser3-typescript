/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2019 Digitsensitive
 * @description  Super Mario Land: Goomba
 * @license      Digitsensitive
 */

import { Enemy } from "./enemy";

export class Goomba extends Enemy {
  private isDying: boolean;
  private speed: number;

  constructor(params) {
    super(params);
    this.isDying = false;
    this.speed = -20;
  }

  update(): void {
    // collision with foreground layer
    this.currentScene.physics.world.collide(
      this,
      this.currentScene.children.getByName("foregroundLayer")
    );

    if (!this.isDying) {
      // goomba is still alive
      // add speed to velocity x
      this.body.setVelocityX(this.speed);

      // if goomba is moving into obstacle from map layer, turn
      if (this.body.blocked.right || this.body.blocked.left) {
        this.speed = -this.speed;
        this.body.velocity.x = this.speed;
      }

      // apply walk animation
      this.anims.play("goombaWalk", true);
    } else {
      // goomba is dying, so stop animation, make velocity 0 and do not check collisions anymore
      this.anims.stop();
      this.body.setVelocity(0, 0);
      this.body.checkCollision.none = true;
    }
  }

  protected gotHitOnHead(): void {
    this.isDying = true;
    this.setFrame(2);
  }

  protected gotHitFromBulletOrMarioHasStar(): void {
    this.isDying = true;

    this.body.setVelocityX(20);
    this.body.setVelocityY(-20);
    this.setFlipY(true);
  }
}
