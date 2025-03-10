import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.model';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.CreateBoard(createBoardDto);
  }
  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }
  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }
  //   @Get()
  //   getAllBoards() {
  //     return this.boardsService.getAllBoards();
  //   }
  //   @Get('/:id')
  //   getBoardById(@Param('id') id: string): Board {
  //     return this.boardsService.getBoardById(id);
  //   }
  //   @Post()
  //   @UsePipes(ValidationPipe)
  //   createBoard(@Body() createBoardDto: CreateBoardDto) {
  //     return this.boardsService.createBoard(createBoardDto);
  //   }

  //   @Delete('/:id')
  //   deleteBoard(@Param('id') id: string): void {
  //     this.boardsService.deleteBoard(id);
  //   }
  //   //   this.boardsService.getAllBoards()

  //   @Patch('/:id/status')
  //   updateBoardStatus(
  //     @Param('id') id: string,
  //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  //   ): Board {
  //     return this.boardsService.updateBoardStatus(id, status);
  //   }
}
