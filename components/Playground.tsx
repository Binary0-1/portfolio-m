import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RefreshCw, Play, X, Trophy } from 'lucide-react';

type GameType = 'snake' | 'tictactoe' | null;

interface PlaygroundProps {
    isDarkMode: boolean;
}

const Playground: React.FC<PlaygroundProps> = ({ isDarkMode }) => {
  const [activeGame, setActiveGame] = useState<GameType>(null);

  return (
    <div className="mt-12">
       <div className="border-t border-border/60 pt-6 mb-8 flex justify-between items-baseline">
        <h2 className="font-serif text-xl font-medium">Intermission</h2>
        <span className="text-xs text-secondary font-serif-italic">Play a game</span>
      </div>

      <div className="bg-surface/30 border border-border/60 rounded-xl p-8 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden transition-colors hover:bg-surface/50">
        
        {/* Game Selector */}
        {!activeGame && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl animate-fade-in z-10">
            <GameCard 
              title="Snake" 
              description="Classic."
              onClick={() => setActiveGame('snake')}
            />
            <GameCard 
              title="Tic-Tac-Toe" 
              description="Strategy."
              onClick={() => setActiveGame('tictactoe')}
            />
          </div>
        )}

        {/* Active Game View */}
        {activeGame && (
          <div className="w-full max-w-lg flex flex-col items-center animate-fade-in z-10">
            <div className="w-full flex justify-between items-center mb-6">
               <button 
                 onClick={() => setActiveGame(null)}
                 className="text-xs font-medium uppercase tracking-wider text-secondary hover:text-primary transition-colors flex items-center gap-2"
               >
                 <X size={14} /> Quit
               </button>
               <h3 className="font-serif text-xl">{activeGame === 'snake' ? 'Snake' : 'Tic-Tac-Toe'}</h3>
               <div className="w-16"></div>
            </div>

            <div className="bg-background p-1 rounded-lg shadow-sm border border-border">
              {activeGame === 'snake' && <SnakeGame isDarkMode={isDarkMode} />}
              {activeGame === 'tictactoe' && <TicTacToeGame />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const GameCard: React.FC<{ title: string; description: string; onClick: () => void }> = ({ title, description, onClick }) => (
  <button 
    onClick={onClick}
    className="group bg-background p-6 rounded-lg border border-border text-left hover:border-primary/40 transition-all duration-300 flex items-center justify-between"
  >
    <div>
      <h3 className="font-medium text-lg mb-0.5">{title}</h3>
      <p className="text-sm text-secondary">{description}</p>
    </div>
    <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors">
       <Play size={12} fill="currentColor" />
    </div>
  </button>
);

/* -------------------------------------------------------------------------- */
/*                                 SNAKE GAME                                 */
/* -------------------------------------------------------------------------- */

const CANVAS_SIZE = 300;
const GRID_SIZE = 15;
const SPEED = 100;

const SnakeGame: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<{x: number, y: number}[]>([{x: 10, y: 10}]);
  const [food, setFood] = useState<{x: number, y: number}>({x: 5, y: 5});
  const [direction, setDirection] = useState<{x: number, y: number}>({x: 1, y: 0});
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const resetGame = () => {
    setSnake([{x: 10, y: 10}]);
    setFood({x: 5, y: 5});
    setDirection({x: 1, y: 0});
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameOver) return;
    switch(e.key) {
      case 'ArrowUp': if(direction.y === 0) setDirection({x: 0, y: -1}); break;
      case 'ArrowDown': if(direction.y === 0) setDirection({x: 0, y: 1}); break;
      case 'ArrowLeft': if(direction.x === 0) setDirection({x: -1, y: 0}); break;
      case 'ArrowRight': if(direction.x === 0) setDirection({x: 1, y: 0}); break;
      case ' ': setIsPaused(p => !p); break;
    }
  }, [direction, gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (gameOver || isPaused) return;
    const moveSnake = setInterval(() => {
      setSnake(prev => {
        const newHead = { x: prev[0].x + direction.x, y: prev[0].y + direction.y };
        if (newHead.x < 0 || newHead.x >= CANVAS_SIZE/GRID_SIZE || newHead.y < 0 || newHead.y >= CANVAS_SIZE/GRID_SIZE) {
          setGameOver(true);
          return prev;
        }
        if (prev.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
           setGameOver(true);
           return prev;
        }
        const newSnake = [newHead, ...prev];
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 1);
          let newFood;
          do { newFood = {x: Math.floor(Math.random() * (CANVAS_SIZE/GRID_SIZE)), y: Math.floor(Math.random() * (CANVAS_SIZE/GRID_SIZE))}; } 
          while (newSnake.some(s => s.x === newFood.x && s.y === newFood.y));
          setFood(newFood);
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, SPEED);
    return () => clearInterval(moveSnake);
  }, [direction, food, gameOver, isPaused]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    
    // Background color based on mode
    ctx.fillStyle = isDarkMode ? '#18181b' : '#ffffff';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Food
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(food.x * GRID_SIZE + GRID_SIZE/2, food.y * GRID_SIZE + GRID_SIZE/2, GRID_SIZE/3, 0, Math.PI * 2);
    ctx.fill();

    // Snake color based on mode
    ctx.fillStyle = isDarkMode ? '#f4f4f5' : '#18181b';
    snake.forEach((segment) => {
        ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
    });
  }, [snake, food, isDarkMode]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between w-full px-2 text-sm">
         <span className="text-secondary">Score: <span className="text-primary font-medium">{score}</span></span>
      </div>
      <div className="relative border border-border">
        <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} className="block" />
        {gameOver && (
          <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center animate-fade-in">
             <span className="font-serif mb-2">Game Over</span>
             <button onClick={resetGame} className="flex items-center gap-2 text-xs bg-primary text-background px-3 py-1.5 rounded hover:opacity-90 transition-opacity">
                <RefreshCw size={12} /> Retry
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                               TIC TAC TOE                                  */
/* -------------------------------------------------------------------------- */

const TicTacToeGame: React.FC = () => {
    const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);

    const checkWinner = (squares: (string | null)[]) => {
        const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
        }
        return null;
    };

    const handleClick = (index: number) => {
        if (board[index] || winner || !isXNext) return;
        const newBoard = [...board];
        newBoard[index] = 'X';
        setBoard(newBoard);
        const w = checkWinner(newBoard);
        if (w) setWinner(w); else if(!newBoard.includes(null)) setWinner('Draw'); else setIsXNext(false);
    };

    useEffect(() => {
        if (!isXNext && !winner) {
            const timer = setTimeout(() => {
                const empty = board.map((v, i) => v === null ? i : null).filter(v => v !== null) as number[];
                if (empty.length > 0) {
                    const idx = empty[Math.floor(Math.random() * empty.length)];
                    const newBoard = [...board];
                    newBoard[idx] = 'O';
                    setBoard(newBoard);
                    const w = checkWinner(newBoard);
                    if (w) setWinner(w); else if(!newBoard.includes(null)) setWinner('Draw');
                    setIsXNext(true);
                }
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [isXNext, board, winner]);

    const resetGame = () => { setBoard(Array(9).fill(null)); setIsXNext(true); setWinner(null); };

    return (
        <div className="flex flex-col items-center gap-6">
             <div className="text-center h-6 text-sm text-secondary font-serif">
                 {winner ? (winner === 'Draw' ? 'Draw' : (winner === 'X' ? 'You won' : 'CPU won')) : (isXNext ? 'Your turn' : '...')}
             </div>
             <div className="grid grid-cols-3 gap-px bg-border">
                 {board.map((cell, idx) => (
                     <button
                         key={idx}
                         onClick={() => handleClick(idx)}
                         disabled={!!cell || !!winner || !isXNext}
                         className="w-16 h-16 bg-background flex items-center justify-center text-xl font-serif hover:bg-surface/50 transition-colors disabled:cursor-default"
                     >
                         {cell}
                     </button>
                 ))}
             </div>
             <button onClick={resetGame} className="text-xs uppercase tracking-wider text-secondary hover:text-primary">Restart</button>
        </div>
    );
};

export default Playground;