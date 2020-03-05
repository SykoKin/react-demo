import React, { useState } from 'react';  // 引入React库
import ReactDom from 'react-dom';         // 引入React-Dom，虚拟Dom render到 实际Dom的对象
import './style.css';                     // 该 组件/文件 调用的css
import Icon from './icons';



// 创建cell组件
const Cell = function(props) {
  let type
  if(props.text) type = props.text === 'X' ? 'ix' : 'io'
  return (
    // <div className="cell" onClick={() => {props.onClick()}}>{props.text}</div>
    <div className="cell" onClick={() => {props.onClick()}}>
      <Icon
          className={props.text === 'X' ? '' : 'red'}
          type={type}
      />
    </div>
  )
}

// 原教程里 step 是用了一个state去标记步数，不是很懂用意(而且state是异步更新)。所以直接用一个step变量便于我理解。
var step = 0;

// 棋盘组件
const Chessboard = function() {
  const [cells, setCells] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])
  const [finish, setFinsh] = useState(false)

  const tell = function(cells) {
    const finish = function(winner) {
      setFinsh(true)
      // 参考vue的$nextTick()
      setTimeout(()=> {
        alert(winner + '赢了')
      }, 0)
    }
    if(cells[0][0] && cells[0][0] === cells[0][1] && cells[0][1] === cells[0][2]) finish(cells[0][0])
    if(cells[1][0] && cells[1][0] === cells[1][1] && cells[1][1] === cells[1][2]) finish(cells[1][0])
    if(cells[2][0] && cells[2][0] === cells[2][1] && cells[2][1] === cells[2][2]) finish(cells[2][0])
    if(cells[0][0] && cells[0][0] === cells[1][0] && cells[1][0] === cells[2][0]) finish(cells[0][0])
    if(cells[0][1] && cells[0][1] === cells[1][1] && cells[1][1] === cells[2][1]) finish(cells[0][1])
    if(cells[0][2] && cells[0][2] === cells[1][2] && cells[1][2] === cells[2][2]) finish(cells[0][2])
    if(cells[0][0] && cells[0][0] === cells[1][1] && cells[1][1] === cells[2][2]) finish(cells[0][0])
    if(cells[0][2] && cells[0][2] === cells[1][1] && cells[1][1] === cells[2][0]) finish(cells[0][2])
  }

  const cellClickHandle = function(row, col) {
    // 防止覆盖
    if(cells[row][col]) return;

    // 更新状态和页面
    step += 1
    cells[row][col] = step % 2 === 0 ? 'O' : 'X';
    const cellsCopy = JSON.parse(JSON.stringify(cells))
    setCells(cellsCopy)

    // 计算是否胜利
    tell(cellsCopy)
  }
  return (
    <div>
      {cells.map((items, row) => {
        return (<div className="row">{items.map((item, col) => {
          return <div className="col"><Cell text={item} onClick={()=> {cellClickHandle(row, col)}} /></div>
        })}</div>) 
      })}
      {finish && <div class="finish">游戏结束</div>}
    </div>
  )
}

ReactDom.render( <div> <Chessboard /> </div>, document.getElementById('root'))  // 这行代码把虚拟Dom 更新到 Dom的 id为root的节点上（根据参数二决定）