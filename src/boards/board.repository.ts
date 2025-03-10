import { CreateBoardDto } from './dto/create-board.dto';
import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.model';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, desc } = createBoardDto;
    const board = this.create({
      title,
      desc,
      status: BoardStatus.PUBLIC,
    });
    await this.save(board);
    return board;
  }
  async deleteBoard(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cant find id ${id}`);
    }
  }
}
