import { BoardRepository } from './board.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}
  CreateBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }
  //as
  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }

    return found;
  }
  deleteBoard(id: number): Promise<void> {
    return this.boardRepository.deleteBoard(id);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    return await this.boardRepository.save(board);
  }
  //   private boards: Board[] = [
  //     {
  //       id: 'zzz',
  //       title: '1',
  //       desc: 'test',
  //       status: BoardStatus.PUBLIC,
  //     },
  //   ];
  //   getAllBoards(): Board[] {
  //     return this.boards;
  //   }
  //   createBoard(createBoardDto: CreateBoardDto) {
  //     const { title, desc } = createBoardDto;
  //     const board: Board = {
  //       id: uuid(),
  //       title,
  //       desc,
  //       status: BoardStatus.PUBLIC,
  //     };
  //     this.boards.push(board);
  //     return board;
  //   }
  //   getBoardById(id: string): Board {
  //     const board = this.boards.find((board) => board.id === id);
  //     if (!board) {
  //       //nest에서는 전역적인 에러 발생 컨트롤을 어떻게 하지? >> 나중에 찾아보기
  //       throw new NotFoundException(`Board widh iD ${id} not found`);
  //     }
  //     return board;
  //   }
  //   deleteBoard(id: string): void {
  //     const board = this.getBoardById(id);
  //     this.boards = this.boards.filter((li) => li.id !== board.id);
  //   }
  //   updateBoardStatus(id: string, status: BoardStatus): Board {
  //     const board = this.getBoardById(id);
  //     board.status = status;
  //     return board;
  //   }
}
