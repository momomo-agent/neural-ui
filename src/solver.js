// 约束求解器 - 将关系转换为布局
import kiwi from 'kiwi.js';

export class ConstraintSolver {
  constructor(containerWidth = 800, containerHeight = 600) {
    this.solver = new kiwi.Solver();
    this.vars = new Map();
    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;
  }

  solve(elements, relations) {
    // 为每个元素创建变量 (x, y, w, h)
    elements.forEach(el => {
      this.vars.set(`${el.id}.x`, new kiwi.Variable(`${el.id}.x`));
      this.vars.set(`${el.id}.y`, new kiwi.Variable(`${el.id}.y`));
      this.vars.set(`${el.id}.w`, new kiwi.Variable(`${el.id}.w`));
      this.vars.set(`${el.id}.h`, new kiwi.Variable(`${el.id}.h`));
    });

    // 添加基础约束
    elements.forEach(el => {
      const x = this.vars.get(`${el.id}.x`);
      const y = this.vars.get(`${el.id}.y`);
      const w = this.vars.get(`${el.id}.w`);
      const h = this.vars.get(`${el.id}.h`);
      
      this.solver.addConstraint(new kiwi.Constraint(x, kiwi.Operator.Ge, 0, kiwi.Strength.required));
      this.solver.addConstraint(new kiwi.Constraint(y, kiwi.Operator.Ge, 0, kiwi.Strength.required));
      this.solver.addConstraint(new kiwi.Constraint(w, kiwi.Operator.Ge, 100, kiwi.Strength.strong));
      this.solver.addConstraint(new kiwi.Constraint(h, kiwi.Operator.Ge, 40, kiwi.Strength.strong));
      this.solver.addConstraint(
        new kiwi.Constraint(
          new kiwi.Expression(x).plus(w), 
          kiwi.Operator.Le, 
          this.containerWidth,
          kiwi.Strength.required
        )
      );
    });

    relations.forEach(rel => this.addRelation(rel));
    this.solver.updateVariables();

    const layout = {};
    elements.forEach(el => {
      layout[el.id] = {
        x: Math.round(this.vars.get(`${el.id}.x`).value()),
        y: Math.round(this.vars.get(`${el.id}.y`).value()),
        w: Math.round(this.vars.get(`${el.id}.w`).value()),
        h: Math.round(this.vars.get(`${el.id}.h`).value()),
      };
    });
    
    return layout;
  }

  addRelation(rel) {
    const { from, to, type, spacing = 0 } = rel;
    
    const fromX = this.vars.get(`${from}.x`);
    const fromY = this.vars.get(`${from}.y`);
    const fromW = this.vars.get(`${from}.w`);
    const fromH = this.vars.get(`${from}.h`);
    
    const toX = this.vars.get(`${to}.x`);
    const toY = this.vars.get(`${to}.y`);
    const toW = this.vars.get(`${to}.w`);
    const toH = this.vars.get(`${to}.h`);

    switch (type) {
      case 'below':
        this.solver.addConstraint(
          new kiwi.Constraint(
            new kiwi.Expression(fromY).plus(fromH).plus(spacing),
            kiwi.Operator.Eq,
            toY,
            kiwi.Strength.required
          )
        );
        break;
        
      case 'above':
        this.solver.addConstraint(
          new kiwi.Constraint(
            new kiwi.Expression(toY).plus(toH).plus(spacing),
            kiwi.Operator.Eq,
            fromY,
            kiwi.Strength.required
          )
        );
        break;
        
      case 'right_of':
        this.solver.addConstraint(
          new kiwi.Constraint(
            new kiwi.Expression(fromX).plus(fromW).plus(spacing),
            kiwi.Operator.Eq,
            toX,
            kiwi.Strength.required
          )
        );
        break;
        
      case 'left_of':
        this.solver.addConstraint(
          new kiwi.Constraint(
            new kiwi.Expression(toX).plus(toW).plus(spacing),
            kiwi.Operator.Eq,
            fromX,
            kiwi.Strength.required
          )
        );
        break;
        
      case 'align_left':
        this.solver.addConstraint(
          new kiwi.Constraint(fromX, kiwi.Operator.Eq, toX, kiwi.Strength.strong)
        );
        break;
        
      case 'align_right':
        this.solver.addConstraint(
          new kiwi.Constraint(
            new kiwi.Expression(fromX).plus(fromW),
            kiwi.Operator.Eq,
            new kiwi.Expression(toX).plus(toW),
            kiwi.Strength.strong
          )
        );
        break;
        
      case 'align_top':
        this.solver.addConstraint(
          new kiwi.Constraint(fromY, kiwi.Operator.Eq, toY, kiwi.Strength.strong)
        );
        break;
        
      case 'align_bottom':
        this.solver.addConstraint(
          new kiwi.Constraint(
            new kiwi.Expression(fromY).plus(fromH),
            kiwi.Operator.Eq,
            new kiwi.Expression(toY).plus(toH),
            kiwi.Strength.strong
          )
        );
        break;
        
      case 'same_width':
        this.solver.addConstraint(
          new kiwi.Constraint(fromW, kiwi.Operator.Eq, toW, kiwi.Strength.strong)
        );
        break;
        
      case 'same_height':
        this.solver.addConstraint(
          new kiwi.Constraint(fromH, kiwi.Operator.Eq, toH, kiwi.Strength.strong)
        );
        break;
    }
  }
}
