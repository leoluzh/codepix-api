import { Console, Command } from 'nestjs-console';
import { getConnection } from 'typeorm';
import * as chalk from 'chalk';

@Console()
export class FixturesCommand {
  @Command({
    command: 'fixtures',
    description: 'Seed data in database',
  })
  async command() {
    await this.runMigrations();
    const fixtures = (await import(`./fixtures/bank-${process.env.BANK_CODE}`))
      .default;
    for (const fixture of fixtures) {
      await this.createInDatabase(fixture.model, fixture.fields);
    }
    console.log(chalk.green('Data generated'));
  }

  async runMigrations() {
    const connection = getConnection('default');
    //run migration in reverse mode to clear database
    for (const {} of connection.migrations.reverse()) {
      await connection.undoLastMigration();
    }
  }

  async createInDatabase(model: any, data: any) {
    const repository = this.getRepository(model);
    const obj = repository.create(data);
    await repository.save(obj);
  }

  getRepository(model: any) {
    const connection = getConnection('default');
    return connection.getRepository(model);
  }
}
