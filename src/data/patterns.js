// 23种设计模式数据配置
export const patterns = [
  // 创建型模式 (Creational Patterns)
  {
    id: 'singleton',
    name: '单例模式',
    nameEn: 'Singleton Pattern',
    category: 'creational',
    description: '确保一个类只有一个实例，并提供全局访问点',
    intent: '保证一个类仅有一个实例，并提供一个访问它的全局访问点',
    applicability: [
      '当类只能有一个实例而且客户可以从一个众所周知的访问点访问它时',
      '当这个唯一实例应该是通过子类化可扩展的，并且客户应该无需更改代码就能使用一个扩展的实例时'
    ]
  },
  {
    id: 'factory',
    name: '工厂方法模式',
    nameEn: 'Factory Method Pattern',
    category: 'creational',
    description: '定义创建对象的接口，让子类决定实例化哪个类',
    intent: '定义一个用于创建对象的接口，让子类决定实例化哪一个类',
    applicability: [
      '当一个类不知道它所必须创建的对象的类的时候',
      '当一个类希望由它的子类来指定它所创建的对象的时候'
    ]
  },
  {
    id: 'abstract-factory',
    name: '抽象工厂模式',
    nameEn: 'Abstract Factory Pattern',
    category: 'creational',
    description: '提供一个创建一系列相关或相互依赖对象的接口',
    intent: '提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类',
    applicability: [
      '一个系统要独立于它的产品的创建、组合和表示时',
      '一个系统要由多个产品系列中的一个来配置时'
    ]
  },
  {
    id: 'builder',
    name: '建造者模式',
    nameEn: 'Builder Pattern',
    category: 'creational',
    description: '将复杂对象的构建与表示分离，使得同样的构建过程可以创建不同的表示',
    intent: '将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示',
    applicability: [
      '当创建复杂对象的算法应该独立于该对象的组成部分以及它们的装配方式时',
      '当构造过程必须允许被构造的对象有不同的表示时'
    ]
  },
  {
    id: 'prototype',
    name: '原型模式',
    nameEn: 'Prototype Pattern',
    category: 'creational',
    description: '用原型实例指定创建对象的种类，并通过复制这些原型创建新的对象',
    intent: '用原型实例指定创建对象的种类，并且通过复制这些原型创建新的对象',
    applicability: [
      '当要实例化的类是在运行时刻指定时',
      '为了避免创建一个与产品类层次平行的工厂类层次时'
    ]
  },

  // 结构型模式 (Structural Patterns)
  {
    id: 'adapter',
    name: '适配器模式',
    nameEn: 'Adapter Pattern',
    category: 'structural',
    description: '将一个类的接口转换成客户希望的另外一个接口',
    intent: '将一个类的接口转换成客户希望的另外一个接口，使得原本由于接口不兼容而不能一起工作的那些类可以一起工作',
    applicability: [
      '你想使用一个已经存在的类，而它的接口不符合你的需求',
      '你想创建一个可以复用的类，该类可以与其他不相关的类或不可预见的类协同工作'
    ]
  },
  {
    id: 'bridge',
    name: '桥接模式',
    nameEn: 'Bridge Pattern',
    category: 'structural',
    description: '将抽象部分与它的实现部分分离，使它们都可以独立地变化',
    intent: '将抽象部分与它的实现部分分离，使它们都可以独立地变化',
    applicability: [
      '你不希望在抽象和它的实现部分之间有一个固定的绑定关系',
      '类的抽象以及它的实现都应该可以通过生成子类的方法加以扩充'
    ]
  },
  {
    id: 'composite',
    name: '组合模式',
    nameEn: 'Composite Pattern',
    category: 'structural',
    description: '将对象组合成树形结构以表示"部分-整体"的层次结构',
    intent: '将对象组合成树形结构以表示"部分-整体"的层次结构，使得用户对单个对象和组合对象的使用具有一致性',
    applicability: [
      '你想表示对象的部分-整体层次结构',
      '你希望用户忽略组合对象与单个对象的不同，用户将统一地使用组合结构中的所有对象'
    ]
  },
  {
    id: 'decorator',
    name: '装饰器模式',
    nameEn: 'Decorator Pattern',
    category: 'structural',
    description: '动态地给一个对象添加一些额外的职责',
    intent: '动态地给一个对象添加一些额外的职责。就增加功能来说，装饰器模式相比生成子类更为灵活',
    applicability: [
      '在不影响其他对象的情况下，以动态、透明的方式给单个对象添加职责',
      '处理那些可以撤销的职责'
    ]
  },
  {
    id: 'facade',
    name: '外观模式',
    nameEn: 'Facade Pattern',
    category: 'structural',
    description: '为子系统中的一组接口提供一个一致的界面',
    intent: '为子系统中的一组接口提供一个一致的界面，外观模式定义了一个高层接口，这个接口使得这一子系统更加容易使用',
    applicability: [
      '当你要为一个复杂子系统提供一个简单接口时',
      '客户程序与抽象类的实现部分之间存在着很大的依赖性'
    ]
  },
  {
    id: 'flyweight',
    name: '享元模式',
    nameEn: 'Flyweight Pattern',
    category: 'structural',
    description: '运用共享技术有效地支持大量细粒度的对象',
    intent: '运用共享技术有效地支持大量细粒度的对象',
    applicability: [
      '一个应用程序使用了大量的对象',
      '完全由于使用大量的对象，造成很大的存储开销'
    ]
  },
  {
    id: 'proxy',
    name: '代理模式',
    nameEn: 'Proxy Pattern',
    category: 'structural',
    description: '为其他对象提供一种代理以控制对这个对象的访问',
    intent: '为其他对象提供一种代理以控制对这个对象的访问',
    applicability: [
      '远程代理：为一个对象在不同的地址空间提供局部代表',
      '虚拟代理：根据需要创建开销很大的对象'
    ]
  },

  // 行为型模式 (Behavioral Patterns)
  {
    id: 'chain-of-responsibility',
    name: '责任链模式',
    nameEn: 'Chain of Responsibility Pattern',
    category: 'behavioral',
    description: '使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系',
    intent: '使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止',
    applicability: [
      '有多个对象可以处理一个请求，哪个对象处理该请求运行时刻自动确定',
      '你想在不明确指定接收者的情况下，向多个对象中的一个提交一个请求'
    ]
  },
  {
    id: 'command',
    name: '命令模式',
    nameEn: 'Command Pattern',
    category: 'behavioral',
    description: '将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化',
    intent: '将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化；对请求排队或记录请求日志，以及支持可撤销的操作',
    applicability: [
      '抽象出待执行的动作以参数化某对象',
      '在不同的时刻指定、排列和执行请求'
    ]
  },
  {
    id: 'iterator',
    name: '迭代器模式',
    nameEn: 'Iterator Pattern',
    category: 'behavioral',
    description: '提供一种方法顺序访问一个聚合对象中各个元素，而又不需暴露该对象的内部表示',
    intent: '提供一种方法顺序访问一个聚合对象中各个元素，而又不需暴露该对象的内部表示',
    applicability: [
      '访问一个聚合对象的内容而无需暴露它的内部表示',
      '支持对聚合对象的多种遍历'
    ]
  },
  {
    id: 'mediator',
    name: '中介者模式',
    nameEn: 'Mediator Pattern',
    category: 'behavioral',
    description: '用一个中介对象来封装一系列的对象交互',
    intent: '用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互',
    applicability: [
      '一组对象以定义良好但是复杂的方式进行通信',
      '一个对象引用其他很多对象并且直接与这些对象通信，导致难以复用该对象'
    ]
  },
  {
    id: 'memento',
    name: '备忘录模式',
    nameEn: 'Memento Pattern',
    category: 'behavioral',
    description: '在不破坏封装性的前提下，捕获一个对象的内部状态',
    intent: '在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。这样以后就可将该对象恢复到原先保存的状态',
    applicability: [
      '必须保存一个对象在某一个时刻的（部分）状态',
      '如果一个用接口来让其它对象直接得到这些状态，将会暴露对象的实现细节并破坏对象的封装性'
    ]
  },
  {
    id: 'observer',
    name: '观察者模式',
    nameEn: 'Observer Pattern',
    category: 'behavioral',
    description: '定义对象间的一种一对多的依赖关系',
    intent: '定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新',
    applicability: [
      '当一个抽象模型有两个方面，其中一个方面依赖于另一方面',
      '当对一个对象的改变需要同时改变其它对象，而不知道具体有多少对象有待改变'
    ]
  },
  {
    id: 'state',
    name: '状态模式',
    nameEn: 'State Pattern',
    category: 'behavioral',
    description: '允许一个对象在其内部状态改变时改变它的行为',
    intent: '允许一个对象在其内部状态改变时改变它的行为。对象看起来似乎修改了它的类',
    applicability: [
      '一个对象的行为取决于它的状态，并且它必须在运行时刻根据状态改变它的行为',
      '一个操作中含有庞大的多分支的条件语句，且这些分支依赖于该对象的状态'
    ]
  },
  {
    id: 'strategy',
    name: '策略模式',
    nameEn: 'Strategy Pattern',
    category: 'behavioral',
    description: '定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换',
    intent: '定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换。本模式使得算法可独立于使用它的客户而变化',
    applicability: [
      '许多相关的类仅仅是行为有异',
      '你需要使用一个算法的不同变体'
    ]
  },
  {
    id: 'template-method',
    name: '模板方法模式',
    nameEn: 'Template Method Pattern',
    category: 'behavioral',
    description: '定义一个操作中的算法的骨架，而将一些步骤延迟到子类中',
    intent: '定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤',
    applicability: [
      '一次性实现一个算法的不变的部分，并将可变的行为留给子类来实现',
      '各子类中公共的行为应被提取出来并集中到一个公共父类中以避免代码重复'
    ]
  },
  {
    id: 'visitor',
    name: '访问者模式',
    nameEn: 'Visitor Pattern',
    category: 'behavioral',
    description: '表示一个作用于某对象结构中的各元素的操作',
    intent: '表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作',
    applicability: [
      '一个对象结构包含很多类对象，它们有不同的接口',
      '需要对一个对象结构中的对象进行很多不同的并且不相关的操作'
    ]
  },
  {
    id: 'interpreter',
    name: '解释器模式',
    nameEn: 'Interpreter Pattern',
    category: 'behavioral',
    description: '给定一个语言，定义它的文法的一种表示',
    intent: '给定一个语言，定义它的文法的一种表示，并定义一个解释器，这个解释器使用该表示来解释语言中的句子',
    applicability: [
      '当有一个语言需要解释执行，并且你可将该语言中的句子表示为一个抽象语法树时',
      '该文法简单'
    ]
  }
]

// 分类信息
export const categories = {
  creational: {
    name: '创建型模式',
    nameEn: 'Creational Patterns',
    description: '这些设计模式提供了一种在创建对象的同时隐藏创建逻辑的方式',
    icon: '🏗️'
  },
  structural: {
    name: '结构型模式',
    nameEn: 'Structural Patterns',
    description: '这些设计模式关注类和对象的组合',
    icon: '🏛️'
  },
  behavioral: {
    name: '行为型模式',
    nameEn: 'Behavioral Patterns',
    description: '这些设计模式特别关注对象之间的通信',
    icon: '⚙️'
  }
}

// 编程语言配置
export const languages = [
  { id: 'csharp', name: 'C#', icon: '🔷', ext: 'cs' },
  { id: 'java', name: 'Java', icon: '☕', ext: 'java' },
  { id: 'go', name: 'Go', icon: '🐹', ext: 'go' },
  { id: 'rust', name: 'Rust', icon: '🦀', ext: 'rs' }
]
