// 行为型设计模式代码

export const behavioralPatterns = {
  // ==================== 命令模式 ====================
  command: {
    csharp: `// 命令模式 - C# 实现
// Command Pattern

using System;
using System.Collections.Generic;

namespace DesignPatterns.Behavioral
{
    // 命令接口
    public interface ICommand
    {
        void Execute();
        void Undo();
    }

    // 接收者
    public class Light
    {
        public void On()
        {
            Console.WriteLine("灯已打开");
        }

        public void Off()
        {
            Console.WriteLine("灯已关闭");
        }
    }

    // 具体命令
    public class LightOnCommand : ICommand
    {
        private Light _light;

        public LightOnCommand(Light light)
        {
            _light = light;
        }

        public void Execute()
        {
            _light.On();
        }

        public void Undo()
        {
            _light.Off();
        }
    }

    public class LightOffCommand : ICommand
    {
        private Light _light;

        public LightOffCommand(Light light)
        {
            _light = light;
        }

        public void Execute()
        {
            _light.Off();
        }

        public void Undo()
        {
            _light.On();
        }
    }

    // 调用者
    public class RemoteControl
    {
        private ICommand _command;
        private Stack<ICommand> _history = new Stack<ICommand>();

        public void SetCommand(ICommand command)
        {
            _command = command;
        }

        public void PressButton()
        {
            _command.Execute();
            _history.Push(_command);
        }

        public void PressUndo()
        {
            if (_history.Count > 0)
            {
                var command = _history.Pop();
                command.Undo();
            }
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            var light = new Light();
            var lightOn = new LightOnCommand(light);
            var lightOff = new LightOffCommand(light);

            var remote = new RemoteControl();
            remote.SetCommand(lightOn);
            remote.PressButton();

            remote.SetCommand(lightOff);
            remote.PressButton();

            remote.PressUndo();
        }
    }
}

/*
适用场景:
- 请求排队
- 撤销操作
- 事务处理
*/`,

    java: `// 命令模式 - Java 实现

package com.designpatterns.behavioral;

import java.util.*;

interface Command {
    void execute();
    void undo();
}

class Light {
    void on() {
        System.out.println("灯已打开");
    }
    
    void off() {
        System.out.println("灯已关闭");
    }
}

class LightOnCommand implements Command {
    private Light light;
    
    public LightOnCommand(Light light) {
        this.light = light;
    }
    
    public void execute() {
        light.on();
    }
    
    public void undo() {
        light.off();
    }
}

class LightOffCommand implements Command {
    private Light light;
    
    public LightOffCommand(Light light) {
        this.light = light;
    }
    
    public void execute() {
        light.off();
    }
    
    public void undo() {
        light.on();
    }
}

class RemoteControl {
    private Command command;
    private Stack<Command> history = new Stack<>();
    
    public void setCommand(Command command) {
        this.command = command;
    }
    
    public void pressButton() {
        command.execute();
        history.push(command);
    }
    
    public void pressUndo() {
        if (!history.isEmpty()) {
            Command cmd = history.pop();
            cmd.undo();
        }
    }
}`,

    go: `// 命令模式 - Go 实现

package command

import "fmt"

type Command interface {
    Execute()
    Undo()
}

type Light struct{}

func (l *Light) On() {
    fmt.Println("灯已打开")
}

func (l *Light) Off() {
    fmt.Println("灯已关闭")
}

type LightOnCommand struct {
    light *Light
}

func NewLightOnCommand(light *Light) *LightOnCommand {
    return &LightOnCommand{light: light}
}

func (c *LightOnCommand) Execute() {
    c.light.On()
}

func (c *LightOnCommand) Undo() {
    c.light.Off()
}

type LightOffCommand struct {
    light *Light
}

func NewLightOffCommand(light *Light) *LightOffCommand {
    return &LightOffCommand{light: light}
}

func (c *LightOffCommand) Execute() {
    c.light.Off()
}

func (c *LightOffCommand) Undo() {
    c.light.On()
}

type RemoteControl struct {
    command Command
    history []Command
}

func (r *RemoteControl) SetCommand(command Command) {
    r.command = command
}

func (r *RemoteControl) PressButton() {
    r.command.Execute()
    r.history = append(r.history, r.command)
}

func (r *RemoteControl) PressUndo() {
    if len(r.history) > 0 {
        cmd := r.history[len(r.history)-1]
        r.history = r.history[:len(r.history)-1]
        cmd.Undo()
    }
}`,

    rust: `// 命令模式 - Rust 实现

trait Command {
    fn execute(&self);
    fn undo(&self);
}

struct Light;

impl Light {
    fn on(&self) {
        println!("灯已打开");
    }
    
    fn off(&self) {
        println!("灯已关闭");
    }
}

struct LightOnCommand {
    light: Light,
}

impl Command for LightOnCommand {
    fn execute(&self) {
        self.light.on();
    }
    
    fn undo(&self) {
        self.light.off();
    }
}

struct LightOffCommand {
    light: Light,
}

impl Command for LightOffCommand {
    fn execute(&self) {
        self.light.off();
    }
    
    fn undo(&self) {
        self.light.on();
    }
}

struct RemoteControl {
    history: Vec<Box<dyn Command>>,
}

impl RemoteControl {
    fn new() -> Self {
        RemoteControl {
            history: Vec::new(),
        }
    }
    
    fn press_button(&mut self, command: Box<dyn Command>) {
        command.execute();
        self.history.push(command);
    }
    
    fn press_undo(&mut self) {
        if let Some(command) = self.history.pop() {
            command.undo();
        }
    }
}`
  },

  // ==================== 模板方法模式 ====================
  'template-method': {
    csharp: `// 模板方法模式 - C# 实现
// Template Method Pattern

using System;

namespace DesignPatterns.Behavioral
{
    // 抽象类
    public abstract class Beverage
    {
        // 模板方法
        public void PrepareRecipe()
        {
            BoilWater();
            Brew();
            PourInCup();
            if (CustomerWantsCondiments())
            {
                AddCondiments();
            }
        }

        private void BoilWater()
        {
            Console.WriteLine("烧开水");
        }

        private void PourInCup()
        {
            Console.WriteLine("倒入杯中");
        }

        // 抽象方法，子类必须实现
        protected abstract void Brew();
        protected abstract void AddCondiments();

        // 钩子方法，子类可选择覆盖
        protected virtual bool CustomerWantsCondiments()
        {
            return true;
        }
    }

    // 具体类 - 茶
    public class Tea : Beverage
    {
        protected override void Brew()
        {
            Console.WriteLine("浸泡茶叶");
        }

        protected override void AddCondiments()
        {
            Console.WriteLine("添加柠檬");
        }
    }

    // 具体类 - 咖啡
    public class Coffee : Beverage
    {
        protected override void Brew()
        {
            Console.WriteLine("冲泡咖啡粉");
        }

        protected override void AddCondiments()
        {
            Console.WriteLine("添加糖和牛奶");
        }

        protected override bool CustomerWantsCondiments()
        {
            return false; // 不添加调料
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            Console.WriteLine("制作茶:");
            Beverage tea = new Tea();
            tea.PrepareRecipe();

            Console.WriteLine("\\n制作咖啡:");
            Beverage coffee = new Coffee();
            coffee.PrepareRecipe();
        }
    }
}

/*
适用场景:
- 算法框架固定，细节可变
- 避免代码重复
- 控制子类扩展
*/`,

    java: `// 模板方法模式 - Java 实现

package com.designpatterns.behavioral;

abstract class Beverage {
    // 模板方法
    final void prepareRecipe() {
        boilWater();
        brew();
        pourInCup();
        if (customerWantsCondiments()) {
            addCondiments();
        }
    }

    private void boilWater() {
        System.out.println("烧开水");
    }

    private void pourInCup() {
        System.out.println("倒入杯中");
    }

    protected abstract void brew();
    protected abstract void addCondiments();

    protected boolean customerWantsCondiments() {
        return true;
    }
}

class Tea extends Beverage {
    protected void brew() {
        System.out.println("浸泡茶叶");
    }

    protected void addCondiments() {
        System.out.println("添加柠檬");
    }
}

class Coffee extends Beverage {
    protected void brew() {
        System.out.println("冲泡咖啡粉");
    }

    protected void addCondiments() {
        System.out.println("添加糖和牛奶");
    }

    protected boolean customerWantsCondiments() {
        return false;
    }
}`,

    go: `// 模板方法模式 - Go 实现

package template

import "fmt"

type Beverage interface {
    Brew()
    AddCondiments()
    CustomerWantsCondiments() bool
}

func PrepareRecipe(b Beverage) {
    boilWater()
    b.Brew()
    pourInCup()
    if b.CustomerWantsCondiments() {
        b.AddCondiments()
    }
}

func boilWater() {
    fmt.Println("烧开水")
}

func pourInCup() {
    fmt.Println("倒入杯中")
}

type Tea struct{}

func (t *Tea) Brew() {
    fmt.Println("浸泡茶叶")
}

func (t *Tea) AddCondiments() {
    fmt.Println("添加柠檬")
}

func (t *Tea) CustomerWantsCondiments() bool {
    return true
}

type Coffee struct{}

func (c *Coffee) Brew() {
    fmt.Println("冲泡咖啡粉")
}

func (c *Coffee) AddCondiments() {
    fmt.Println("添加糖和牛奶")
}

func (c *Coffee) CustomerWantsCondiments() bool {
    return false
}`,

    rust: `// 模板方法模式 - Rust 实现

trait Beverage {
    fn brew(&self);
    fn add_condiments(&self);
    
    fn customer_wants_condiments(&self) -> bool {
        true
    }
    
    fn prepare_recipe(&self) {
        self.boil_water();
        self.brew();
        self.pour_in_cup();
        if self.customer_wants_condiments() {
            self.add_condiments();
        }
    }
    
    fn boil_water(&self) {
        println!("烧开水");
    }
    
    fn pour_in_cup(&self) {
        println!("倒入杯中");
    }
}

struct Tea;

impl Beverage for Tea {
    fn brew(&self) {
        println!("浸泡茶叶");
    }
    
    fn add_condiments(&self) {
        println!("添加柠檬");
    }
}

struct Coffee;

impl Beverage for Coffee {
    fn brew(&self) {
        println!("冲泡咖啡粉");
    }
    
    fn add_condiments(&self) {
        println!("添加糖和牛奶");
    }
    
    fn customer_wants_condiments(&self) -> bool {
        false
    }
}`
  },

  // ==================== 迭代器模式 ====================
  iterator: {
    csharp: `// 迭代器模式 - C# 实现
// Iterator Pattern

using System;
using System.Collections;
using System.Collections.Generic;

namespace DesignPatterns.Behavioral
{
    // 聚合接口
    public interface IBookCollection
    {
        IIterator CreateIterator();
    }

    // 迭代器接口
    public interface IIterator
    {
        bool HasNext();
        object Next();
    }

    // 具体聚合
    public class BookCollection : IBookCollection
    {
        private List<string> books = new List<string>();

        public void AddBook(string book)
        {
            books.Add(book);
        }

        public IIterator CreateIterator()
        {
            return new BookIterator(books);
        }
    }

    // 具体迭代器
    public class BookIterator : IIterator
    {
        private List<string> books;
        private int position = 0;

        public BookIterator(List<string> books)
        {
            this.books = books;
        }

        public bool HasNext()
        {
            return position < books.Count;
        }

        public object Next()
        {
            if (HasNext())
            {
                return books[position++];
            }
            return null;
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            var collection = new BookCollection();
            collection.AddBook("设计模式");
            collection.AddBook("清洁代码");
            collection.AddBook("重构");

            var iterator = collection.CreateIterator();
            while (iterator.HasNext())
            {
                Console.WriteLine(iterator.Next());
            }
        }
    }
}

/*
适用场景:
- 遭历聚合对象
- 隐藏内部结构
- 提供统一接口
*/`,

    java: `// 迭代器模式 - Java 实现

package com.designpatterns.behavioral;

import java.util.*;

interface Iterator<T> {
    boolean hasNext();
    T next();
}

interface Collection<T> {
    Iterator<T> createIterator();
}

class BookCollection implements Collection<String> {
    private List<String> books = new ArrayList<>();

    public void addBook(String book) {
        books.add(book);
    }

    public Iterator<String> createIterator() {
        return new BookIterator(books);
    }
}

class BookIterator implements Iterator<String> {
    private List<String> books;
    private int position = 0;

    public BookIterator(List<String> books) {
        this.books = books;
    }

    public boolean hasNext() {
        return position < books.size();
    }

    public String next() {
        if (hasNext()) {
            return books.get(position++);
        }
        return null;
    }
}`,

    go: `// 迭代器模式 - Go 实现

package iterator

import "fmt"

type Iterator interface {
    HasNext() bool
    Next() interface{}
}

type Collection interface {
    CreateIterator() Iterator
}

type BookCollection struct {
    books []string
}

func (c *BookCollection) AddBook(book string) {
    c.books = append(c.books, book)
}

func (c *BookCollection) CreateIterator() Iterator {
    return &BookIterator{
        books:    c.books,
        position: 0,
    }
}

type BookIterator struct {
    books    []string
    position int
}

func (i *BookIterator) HasNext() bool {
    return i.position < len(i.books)
}

func (i *BookIterator) Next() interface{} {
    if i.HasNext() {
        book := i.books[i.position]
        i.position++
        return book
    }
    return nil
}

func Example() {
    collection := &BookCollection{}
    collection.AddBook("设计模式")
    collection.AddBook("清洁代码")
    collection.AddBook("重构")

    iterator := collection.CreateIterator()
    for iterator.HasNext() {
        fmt.Println(iterator.Next())
    }
}`,

    rust: `// 迭代器模式 - Rust 实现

struct BookCollection {
    books: Vec<String>,
}

impl BookCollection {
    fn new() -> Self {
        BookCollection {
            books: Vec::new(),
        }
    }

    fn add_book(&mut self, book: String) {
        self.books.push(book);
    }
}

impl IntoIterator for BookCollection {
    type Item = String;
    type IntoIter = std::vec::IntoIter<String>;

    fn into_iter(self) -> Self::IntoIter {
        self.books.into_iter()
    }
}

fn main() {
    let mut collection = BookCollection::new();
    collection.add_book("设计模式".to_string());
    collection.add_book("清洁代码".to_string());
    collection.add_book("重构".to_string());

    for book in collection {
        println!("{}", book);
    }
}`
  },

  // ==================== 状态模式 ====================
  state: {
    csharp: `// 状态模式 - C# 实现
// State Pattern

using System;

namespace DesignPatterns.Behavioral
{
    // 状态接口
    public interface IState
    {
        void InsertCoin();
        void EjectCoin();
        void TurnCrank();
        void Dispense();
    }

    // 上下文
    public class VendingMachine
    {
        private IState _noCoinState;
        private IState _hasCoinState;
        private IState _soldState;
        private IState _currentState;

        public VendingMachine()
        {
            _noCoinState = new NoCoinState(this);
            _hasCoinState = new HasCoinState(this);
            _soldState = new SoldState(this);
            _currentState = _noCoinState;
        }

        public void SetState(IState state)
        {
            _currentState = state;
        }

        public IState GetNoCoinState() => _noCoinState;
        public IState GetHasCoinState() => _hasCoinState;
        public IState GetSoldState() => _soldState;

        public void InsertCoin() => _currentState.InsertCoin();
        public void EjectCoin() => _currentState.EjectCoin();
        public void TurnCrank() => _currentState.TurnCrank();
    }

    // 具体状态
    public class NoCoinState : IState
    {
        private VendingMachine _machine;

        public NoCoinState(VendingMachine machine)
        {
            _machine = machine;
        }

        public void InsertCoin()
        {
            Console.WriteLine("投币成功");
            _machine.SetState(_machine.GetHasCoinState());
        }

        public void EjectCoin()
        {
            Console.WriteLine("还没有投币");
        }

        public void TurnCrank()
        {
            Console.WriteLine("请先投币");
        }

        public void Dispense()
        {
            Console.WriteLine("无法出货");
        }
    }

    public class HasCoinState : IState
    {
        private VendingMachine _machine;

        public HasCoinState(VendingMachine machine)
        {
            _machine = machine;
        }

        public void InsertCoin()
        {
            Console.WriteLine("已经有硬币了");
        }

        public void EjectCoin()
        {
            Console.WriteLine("退币成功");
            _machine.SetState(_machine.GetNoCoinState());
        }

        public void TurnCrank()
        {
            Console.WriteLine("转动手柄");
            _machine.SetState(_machine.GetSoldState());
            Dispense();
        }

        public void Dispense()
        {
            Console.WriteLine("出货中...");
            _machine.SetState(_machine.GetNoCoinState());
        }
    }

    public class SoldState : IState
    {
        private VendingMachine _machine;

        public SoldState(VendingMachine machine)
        {
            _machine = machine;
        }

        public void InsertCoin()
        {
            Console.WriteLine("请稍候");
        }

        public void EjectCoin()
        {
            Console.WriteLine("已出货，不能退币");
        }

        public void TurnCrank()
        {
            Console.WriteLine("请勿重复操作");
        }

        public void Dispense() { }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            var machine = new VendingMachine();
            machine.InsertCoin();
            machine.TurnCrank();
        }
    }
}

/*
适用场景:
- 对象行为随状态改变
- 大量条件语句
- 状态机
*/`,

    java: `// 状态模式 - Java 实现

package com.designpatterns.behavioral;

interface State {
    void insertCoin();
    void ejectCoin();
    void turnCrank();
    void dispense();
}

class VendingMachine {
    private State noCoinState;
    private State hasCoinState;
    private State soldState;
    private State currentState;

    public VendingMachine() {
        noCoinState = new NoCoinState(this);
        hasCoinState = new HasCoinState(this);
        soldState = new SoldState(this);
        currentState = noCoinState;
    }

    public void setState(State state) {
        this.currentState = state;
    }

    public State getNoCoinState() { return noCoinState; }
    public State getHasCoinState() { return hasCoinState; }
    public State getSoldState() { return soldState; }

    public void insertCoin() { currentState.insertCoin(); }
    public void ejectCoin() { currentState.ejectCoin(); }
    public void turnCrank() { currentState.turnCrank(); }
}

class NoCoinState implements State {
    private VendingMachine machine;

    public NoCoinState(VendingMachine machine) {
        this.machine = machine;
    }

    public void insertCoin() {
        System.out.println("投币成功");
        machine.setState(machine.getHasCoinState());
    }

    public void ejectCoin() {
        System.out.println("还没有投币");
    }

    public void turnCrank() {
        System.out.println("请先投币");
    }

    public void dispense() { }
}`,

    go: `// 状态模式 - Go 实现

package state

import "fmt"

type State interface {
    InsertCoin()
    EjectCoin()
    TurnCrank()
    Dispense()
}

type VendingMachine struct {
    noCoinState  State
    hasCoinState State
    soldState    State
    currentState State
}

func NewVendingMachine() *VendingMachine {
    m := &VendingMachine{}
    m.noCoinState = &NoCoinState{machine: m}
    m.hasCoinState = &HasCoinState{machine: m}
    m.soldState = &SoldState{machine: m}
    m.currentState = m.noCoinState
    return m
}

func (m *VendingMachine) SetState(state State) {
    m.currentState = state
}

func (m *VendingMachine) InsertCoin() {
    m.currentState.InsertCoin()
}

func (m *VendingMachine) EjectCoin() {
    m.currentState.EjectCoin()
}

func (m *VendingMachine) TurnCrank() {
    m.currentState.TurnCrank()
}

type NoCoinState struct {
    machine *VendingMachine
}

func (s *NoCoinState) InsertCoin() {
    fmt.Println("投币成功")
    s.machine.SetState(s.machine.hasCoinState)
}

func (s *NoCoinState) EjectCoin() {
    fmt.Println("还没有投币")
}

func (s *NoCoinState) TurnCrank() {
    fmt.Println("请先投币")
}

func (s *NoCoinState) Dispense() {}`,

    rust: `// 状态模式 - Rust 实现

trait State {
    fn insert_coin(self: Box<Self>) -> Box<dyn State>;
    fn eject_coin(self: Box<Self>) -> Box<dyn State>;
    fn turn_crank(self: Box<Self>) -> Box<dyn State>;
}

struct NoCoinState;

impl State for NoCoinState {
    fn insert_coin(self: Box<Self>) -> Box<dyn State> {
        println!("投币成功");
        Box::new(HasCoinState)
    }

    fn eject_coin(self: Box<Self>) -> Box<dyn State> {
        println!("还没有投币");
        self
    }

    fn turn_crank(self: Box<Self>) -> Box<dyn State> {
        println!("请先投币");
        self
    }
}

struct HasCoinState;

impl State for HasCoinState {
    fn insert_coin(self: Box<Self>) -> Box<dyn State> {
        println!("已经有硬币了");
        self
    }

    fn eject_coin(self: Box<Self>) -> Box<dyn State> {
        println!("退币成功");
        Box::new(NoCoinState)
    }

    fn turn_crank(self: Box<Self>) -> Box<dyn State> {
        println!("转动手柄");
        println!("出货中...");
        Box::new(NoCoinState)
    }
}

struct VendingMachine {
    state: Box<dyn State>,
}

impl VendingMachine {
    fn new() -> Self {
        VendingMachine {
            state: Box::new(NoCoinState),
        }
    }

    fn insert_coin(&mut self) {
        let state = std::mem::replace(&mut self.state, Box::new(NoCoinState));
        self.state = state.insert_coin();
    }

    fn eject_coin(&mut self) {
        let state = std::mem::replace(&mut self.state, Box::new(NoCoinState));
        self.state = state.eject_coin();
    }

    fn turn_crank(&mut self) {
        let state = std::mem::replace(&mut self.state, Box::new(NoCoinState));
        self.state = state.turn_crank();
    }
}`
  },

  // ==================== 责任链模式 ====================
  'chain-of-responsibility': {
    csharp: `// 责任链模式 - C# 实现
// Chain of Responsibility Pattern

using System;

namespace DesignPatterns.Behavioral
{
    // 处理者抽象类
    public abstract class Handler
    {
        protected Handler nextHandler;

        public void SetNext(Handler handler)
        {
            nextHandler = handler;
        }

        public abstract void HandleRequest(int level);
    }

    // 具体处理者 - 经理
    public class Manager : Handler
    {
        public override void HandleRequest(int level)
        {
            if (level <= 1)
            {
                Console.WriteLine("经理处理请求");
            }
            else if (nextHandler != null)
            {
                nextHandler.HandleRequest(level);
            }
        }
    }

    // 具体处理者 - 总监
    public class Director : Handler
    {
        public override void HandleRequest(int level)
        {
            if (level <= 2)
            {
                Console.WriteLine("总监处理请求");
            }
            else if (nextHandler != null)
            {
                nextHandler.HandleRequest(level);
            }
        }
    }

    // 具体处理者 - CEO
    public class CEO : Handler
    {
        public override void HandleRequest(int level)
        {
            if (level <= 3)
            {
                Console.WriteLine("CEO处理请求");
            }
            else
            {
                Console.WriteLine("请求无法处理");
            }
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            var manager = new Manager();
            var director = new Director();
            var ceo = new CEO();

            manager.SetNext(director);
            director.SetNext(ceo);

            manager.HandleRequest(1);
            manager.HandleRequest(2);
            manager.HandleRequest(3);
        }
    }
}

/*
适用场景:
- 多个对象可处理请求
- 请求处理顺序不确定
- 动态指定处理者
*/`,

    java: `// 责任链模式 - Java 实现

package com.designpatterns.behavioral;

abstract class Handler {
    protected Handler nextHandler;

    public void setNext(Handler handler) {
        this.nextHandler = handler;
    }

    public abstract void handleRequest(int level);
}

class Manager extends Handler {
    public void handleRequest(int level) {
        if (level <= 1) {
            System.out.println("经理处理请求");
        } else if (nextHandler != null) {
            nextHandler.handleRequest(level);
        }
    }
}

class Director extends Handler {
    public void handleRequest(int level) {
        if (level <= 2) {
            System.out.println("总监处理请求");
        } else if (nextHandler != null) {
            nextHandler.handleRequest(level);
        }
    }
}

class CEO extends Handler {
    public void handleRequest(int level) {
        if (level <= 3) {
            System.out.println("CEO处理请求");
        } else {
            System.out.println("请求无法处理");
        }
    }
}`,

    go: `// 责任链模式 - Go 实现

package chain

import "fmt"

type Handler interface {
    SetNext(handler Handler)
    HandleRequest(level int)
}

type BaseHandler struct {
    nextHandler Handler
}

func (h *BaseHandler) SetNext(handler Handler) {
    h.nextHandler = handler
}

type Manager struct {
    BaseHandler
}

func (m *Manager) HandleRequest(level int) {
    if level <= 1 {
        fmt.Println("经理处理请求")
    } else if m.nextHandler != nil {
        m.nextHandler.HandleRequest(level)
    }
}

type Director struct {
    BaseHandler
}

func (d *Director) HandleRequest(level int) {
    if level <= 2 {
        fmt.Println("总监处理请求")
    } else if d.nextHandler != nil {
        d.nextHandler.HandleRequest(level)
    }
}

type CEO struct {
    BaseHandler
}

func (c *CEO) HandleRequest(level int) {
    if level <= 3 {
        fmt.Println("CEO处理请求")
    } else {
        fmt.Println("请求无法处理")
    }
}`,

    rust: `// 责任链模式 - Rust 实现

trait Handler {
    fn set_next(&mut self, handler: Box<dyn Handler>);
    fn handle_request(&self, level: i32);
}

struct Manager {
    next: Option<Box<dyn Handler>>,
}

impl Manager {
    fn new() -> Self {
        Manager { next: None }
    }
}

impl Handler for Manager {
    fn set_next(&mut self, handler: Box<dyn Handler>) {
        self.next = Some(handler);
    }

    fn handle_request(&self, level: i32) {
        if level <= 1 {
            println!("经理处理请求");
        } else if let Some(ref next) = self.next {
            next.handle_request(level);
        }
    }
}

struct Director {
    next: Option<Box<dyn Handler>>,
}

impl Director {
    fn new() -> Self {
        Director { next: None }
    }
}

impl Handler for Director {
    fn set_next(&mut self, handler: Box<dyn Handler>) {
        self.next = Some(handler);
    }

    fn handle_request(&self, level: i32) {
        if level <= 2 {
            println!("总监处理请求");
        } else if let Some(ref next) = self.next {
            next.handle_request(level);
        }
    }
}

struct CEO;

impl Handler for CEO {
    fn set_next(&mut self, _handler: Box<dyn Handler>) {}

    fn handle_request(&self, level: i32) {
        if level <= 3 {
            println!("CEO处理请求");
        } else {
            println!("请求无法处理");
        }
    }
}`
  },

  // ==================== 备忘录模式 ====================
  memento: {
    csharp: `// 备忘录模式 - C# 实现
// Memento Pattern

using System;
using System.Collections.Generic;

namespace DesignPatterns.Behavioral
{
    // 备忘录
    public class Memento
    {
        public string State { get; private set; }

        public Memento(string state)
        {
            State = state;
        }
    }

    // 原发器
    public class TextEditor
    {
        private string _text;

        public void SetText(string text)
        {
            _text = text;
            Console.WriteLine($"当前文本: {_text}");
        }

        public string GetText()
        {
            return _text;
        }

        public Memento Save()
        {
            return new Memento(_text);
        }

        public void Restore(Memento memento)
        {
            _text = memento.State;
            Console.WriteLine($"恢复文本: {_text}");
        }
    }

    // 管理者
    public class History
    {
        private Stack<Memento> _mementos = new Stack<Memento>();

        public void Push(Memento memento)
        {
            _mementos.Push(memento);
        }

        public Memento Pop()
        {
            return _mementos.Count > 0 ? _mementos.Pop() : null;
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            var editor = new TextEditor();
            var history = new History();

            editor.SetText("Version 1");
            history.Push(editor.Save());

            editor.SetText("Version 2");
            history.Push(editor.Save());

            editor.SetText("Version 3");

            Console.WriteLine("\n开始撤销:");
            editor.Restore(history.Pop());
            editor.Restore(history.Pop());
        }
    }
}

/*
适用场景:
- 撤销/重做功能
- 保存历史状态
- 快照功能
*/`,

    java: `// 备忘录模式 - Java 实现

package com.designpatterns.behavioral;

import java.util.*;

class Memento {
    private String state;

    public Memento(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }
}

class TextEditor {
    private String text;

    public void setText(String text) {
        this.text = text;
        System.out.println("当前文本: " + text);
    }

    public String getText() {
        return text;
    }

    public Memento save() {
        return new Memento(text);
    }

    public void restore(Memento memento) {
        this.text = memento.getState();
        System.out.println("恢复文本: " + text);
    }
}

class History {
    private Stack<Memento> mementos = new Stack<>();

    public void push(Memento memento) {
        mementos.push(memento);
    }

    public Memento pop() {
        return !mementos.isEmpty() ? mementos.pop() : null;
    }
}`,

    go: `// 备忘录模式 - Go 实现

package memento

import "fmt"

type Memento struct {
    state string
}

func NewMemento(state string) *Memento {
    return &Memento{state: state}
}

func (m *Memento) GetState() string {
    return m.state
}

type TextEditor struct {
    text string
}

func (e *TextEditor) SetText(text string) {
    e.text = text
    fmt.Printf("当前文本: %s\n", text)
}

func (e *TextEditor) GetText() string {
    return e.text
}

func (e *TextEditor) Save() *Memento {
    return NewMemento(e.text)
}

func (e *TextEditor) Restore(memento *Memento) {
    e.text = memento.GetState()
    fmt.Printf("恢复文本: %s\n", e.text)
}

type History struct {
    mementos []*Memento
}

func (h *History) Push(memento *Memento) {
    h.mementos = append(h.mementos, memento)
}

func (h *History) Pop() *Memento {
    if len(h.mementos) == 0 {
        return nil
    }
    memento := h.mementos[len(h.mementos)-1]
    h.mementos = h.mementos[:len(h.mementos)-1]
    return memento
}`,

    rust: `// 备忘录模式 - Rust 实现

struct Memento {
    state: String,
}

impl Memento {
    fn new(state: String) -> Self {
        Memento { state }
    }

    fn get_state(&self) -> &str {
        &self.state
    }
}

struct TextEditor {
    text: String,
}

impl TextEditor {
    fn new() -> Self {
        TextEditor {
            text: String::new(),
        }
    }

    fn set_text(&mut self, text: String) {
        self.text = text;
        println!("当前文本: {}", self.text);
    }

    fn get_text(&self) -> &str {
        &self.text
    }

    fn save(&self) -> Memento {
        Memento::new(self.text.clone())
    }

    fn restore(&mut self, memento: &Memento) {
        self.text = memento.get_state().to_string();
        println!("恢复文本: {}", self.text);
    }
}

struct History {
    mementos: Vec<Memento>,
}

impl History {
    fn new() -> Self {
        History {
            mementos: Vec::new(),
        }
    }

    fn push(&mut self, memento: Memento) {
        self.mementos.push(memento);
    }

    fn pop(&mut self) -> Option<Memento> {
        self.mementos.pop()
    }
}`
  },

  // ==================== 中介者模式 ====================
  mediator: {
    csharp: `// 中介者模式 - C# 实现
// Mediator Pattern

using System;
using System.Collections.Generic;

namespace DesignPatterns.Behavioral
{
    // 中介者接口
    public interface IChatMediator
    {
        void SendMessage(string message, User user);
        void AddUser(User user);
    }

    // 具体中介者
    public class ChatRoom : IChatMediator
    {
        private List<User> users = new List<User>();

        public void AddUser(User user)
        {
            users.Add(user);
        }

        public void SendMessage(string message, User sender)
        {
            foreach (var user in users)
            {
                if (user != sender)
                {
                    user.Receive(message);
                }
            }
        }
    }

    // 同事类
    public class User
    {
        private IChatMediator _mediator;
        private string _name;

        public User(string name, IChatMediator mediator)
        {
            _name = name;
            _mediator = mediator;
        }

        public void Send(string message)
        {
            Console.WriteLine($"{_name} 发送: {message}");
            _mediator.SendMessage(message, this);
        }

        public void Receive(string message)
        {
            Console.WriteLine($"{_name} 接收: {message}");
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            var chatRoom = new ChatRoom();

            var user1 = new User("张三", chatRoom);
            var user2 = new User("李四", chatRoom);
            var user3 = new User("王五", chatRoom);

            chatRoom.AddUser(user1);
            chatRoom.AddUser(user2);
            chatRoom.AddUser(user3);

            user1.Send("大家好!");
        }
    }
}

/*
适用场景:
- 对象间复杂交互
- 降低耦合度
- 聊天室等系统
*/`,

    java: `// 中介者模式 - Java 实现

package com.designpatterns.behavioral;

import java.util.*;

interface ChatMediator {
    void sendMessage(String message, User user);
    void addUser(User user);
}

class ChatRoom implements ChatMediator {
    private List<User> users = new ArrayList<>();

    public void addUser(User user) {
        users.add(user);
    }

    public void sendMessage(String message, User sender) {
        for (User user : users) {
            if (user != sender) {
                user.receive(message);
            }
        }
    }
}

class User {
    private ChatMediator mediator;
    private String name;

    public User(String name, ChatMediator mediator) {
        this.name = name;
        this.mediator = mediator;
    }

    public void send(String message) {
        System.out.println(name + " 发送: " + message);
        mediator.sendMessage(message, this);
    }

    public void receive(String message) {
        System.out.println(name + " 接收: " + message);
    }
}`,

    go: `// 中介者模式 - Go 实现

package mediator

import "fmt"

type ChatMediator interface {
    SendMessage(message string, user *User)
    AddUser(user *User)
}

type ChatRoom struct {
    users []*User
}

func (c *ChatRoom) AddUser(user *User) {
    c.users = append(c.users, user)
}

func (c *ChatRoom) SendMessage(message string, sender *User) {
    for _, user := range c.users {
        if user != sender {
            user.Receive(message)
        }
    }
}

type User struct {
    mediator ChatMediator
    name     string
}

func NewUser(name string, mediator ChatMediator) *User {
    return &User{
        name:     name,
        mediator: mediator,
    }
}

func (u *User) Send(message string) {
    fmt.Printf("%s 发送: %s\n", u.name, message)
    u.mediator.SendMessage(message, u)
}

func (u *User) Receive(message string) {
    fmt.Printf("%s 接收: %s\n", u.name, message)
}`,

    rust: `// 中介者模式 - Rust 实现

use std::rc::Rc;
use std::cell::RefCell;

trait ChatMediator {
    fn send_message(&self, message: &str, sender: usize);
    fn add_user(&mut self, user: Rc<RefCell<User>>);
}

struct ChatRoom {
    users: Vec<Rc<RefCell<User>>>,
}

impl ChatRoom {
    fn new() -> Self {
        ChatRoom {
            users: Vec::new(),
        }
    }
}

impl ChatMediator for ChatRoom {
    fn add_user(&mut self, user: Rc<RefCell<User>>) {
        self.users.push(user);
    }

    fn send_message(&self, message: &str, sender_id: usize) {
        for (id, user) in self.users.iter().enumerate() {
            if id != sender_id {
                user.borrow().receive(message);
            }
        }
    }
}

struct User {
    name: String,
    id: usize,
}

impl User {
    fn new(name: String, id: usize) -> Self {
        User { name, id }
    }

    fn send(&self, message: &str, mediator: &dyn ChatMediator) {
        println!("{} 发送: {}", self.name, message);
        mediator.send_message(message, self.id);
    }

    fn receive(&self, message: &str) {
        println!("{} 接收: {}", self.name, message);
    }
}`
  },

  // ==================== 访问者模式 ====================
  visitor: {
    csharp: `// 访问者模式 - C# 实现
// Visitor Pattern

using System;
using System.Collections.Generic;

namespace DesignPatterns.Behavioral
{
    // 访问者接口
    public interface IVisitor
    {
        void Visit(Book book);
        void Visit(Fruit fruit);
    }

    // 元素接口
    public interface IElement
    {
        void Accept(IVisitor visitor);
    }

    // 具体元素 - 书
    public class Book : IElement
    {
        public string Name { get; set; }
        public double Price { get; set; }

        public Book(string name, double price)
        {
            Name = name;
            Price = price;
        }

        public void Accept(IVisitor visitor)
        {
            visitor.Visit(this);
        }
    }

    // 具体元素 - 水果
    public class Fruit : IElement
    {
        public string Name { get; set; }
        public double PricePerKg { get; set; }
        public double Weight { get; set; }

        public Fruit(string name, double pricePerKg, double weight)
        {
            Name = name;
            PricePerKg = pricePerKg;
            Weight = weight;
        }

        public void Accept(IVisitor visitor)
        {
            visitor.Visit(this);
        }
    }

    // 具体访问者 - 计算价格
    public class PriceCalculator : IVisitor
    {
        private double _total = 0;

        public void Visit(Book book)
        {
            _total += book.Price;
            Console.WriteLine($"书籍: {book.Name}, 价格: ¥{book.Price}");
        }

        public void Visit(Fruit fruit)
        {
            double cost = fruit.PricePerKg * fruit.Weight;
            _total += cost;
            Console.WriteLine($"水果: {fruit.Name}, 价格: ¥{cost:F2}");
        }

        public double GetTotal()
        {
            return _total;
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            var items = new List<IElement>
            {
                new Book("设计模式", 59.0),
                new Fruit("苹果", 8.5, 2.0),
                new Book("清洁代码", 79.0)
            };

            var calculator = new PriceCalculator();
            foreach (var item in items)
            {
                item.Accept(calculator);
            }

            Console.WriteLine($"\n总计: ¥{calculator.GetTotal():F2}");
        }
    }
}

/*
适用场景:
- 对象结构稳定，操作多变
- 需要对对象结构进行多种不同操作
- AST遍历
*/`,

    java: `// 访问者模式 - Java 实现

package com.designpatterns.behavioral;

import java.util.*;

interface Visitor {
    void visit(Book book);
    void visit(Fruit fruit);
}

interface Element {
    void accept(Visitor visitor);
}

class Book implements Element {
    private String name;
    private double price;

    public Book(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() { return name; }
    public double getPrice() { return price; }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}

class Fruit implements Element {
    private String name;
    private double pricePerKg;
    private double weight;

    public Fruit(String name, double pricePerKg, double weight) {
        this.name = name;
        this.pricePerKg = pricePerKg;
        this.weight = weight;
    }

    public String getName() { return name; }
    public double getPricePerKg() { return pricePerKg; }
    public double getWeight() { return weight; }

    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}

class PriceCalculator implements Visitor {
    private double total = 0;

    public void visit(Book book) {
        total += book.getPrice();
        System.out.println("书籍: " + book.getName() + ", 价格: ¥" + book.getPrice());
    }

    public void visit(Fruit fruit) {
        double cost = fruit.getPricePerKg() * fruit.getWeight();
        total += cost;
        System.out.printf("水果: %s, 价格: ¥%.2f\n", fruit.getName(), cost);
    }

    public double getTotal() {
        return total;
    }
}`,

    go: `// 访问者模式 - Go 实现

package visitor

import "fmt"

type Visitor interface {
    VisitBook(book *Book)
    VisitFruit(fruit *Fruit)
}

type Element interface {
    Accept(visitor Visitor)
}

type Book struct {
    Name  string
    Price float64
}

func (b *Book) Accept(visitor Visitor) {
    visitor.VisitBook(b)
}

type Fruit struct {
    Name       string
    PricePerKg float64
    Weight     float64
}

func (f *Fruit) Accept(visitor Visitor) {
    visitor.VisitFruit(f)
}

type PriceCalculator struct {
    total float64
}

func (p *PriceCalculator) VisitBook(book *Book) {
    p.total += book.Price
    fmt.Printf("书籍: %s, 价格: ¥%.2f\n", book.Name, book.Price)
}

func (p *PriceCalculator) VisitFruit(fruit *Fruit) {
    cost := fruit.PricePerKg * fruit.Weight
    p.total += cost
    fmt.Printf("水果: %s, 价格: ¥%.2f\n", fruit.Name, cost)
}

func (p *PriceCalculator) GetTotal() float64 {
    return p.total
}`,

    rust: `// 访问者模式 - Rust 实现

trait Visitor {
    fn visit_book(&mut self, book: &Book);
    fn visit_fruit(&mut self, fruit: &Fruit);
}

trait Element {
    fn accept(&self, visitor: &mut dyn Visitor);
}

struct Book {
    name: String,
    price: f64,
}

impl Book {
    fn new(name: String, price: f64) -> Self {
        Book { name, price }
    }
}

impl Element for Book {
    fn accept(&self, visitor: &mut dyn Visitor) {
        visitor.visit_book(self);
    }
}

struct Fruit {
    name: String,
    price_per_kg: f64,
    weight: f64,
}

impl Fruit {
    fn new(name: String, price_per_kg: f64, weight: f64) -> Self {
        Fruit {
            name,
            price_per_kg,
            weight,
        }
    }
}

impl Element for Fruit {
    fn accept(&self, visitor: &mut dyn Visitor) {
        visitor.visit_fruit(self);
    }
}

struct PriceCalculator {
    total: f64,
}

impl PriceCalculator {
    fn new() -> Self {
        PriceCalculator { total: 0.0 }
    }

    fn get_total(&self) -> f64 {
        self.total
    }
}

impl Visitor for PriceCalculator {
    fn visit_book(&mut self, book: &Book) {
        self.total += book.price;
        println!("书籍: {}, 价格: ¥{:.2}", book.name, book.price);
    }

    fn visit_fruit(&mut self, fruit: &Fruit) {
        let cost = fruit.price_per_kg * fruit.weight;
        self.total += cost;
        println!("水果: {}, 价格: ¥{:.2}", fruit.name, cost);
    }
}`
  },

  // ==================== 解释器模式 ====================
  interpreter: {
    csharp: `// 解释器模式 - C# 实现
// Interpreter Pattern

using System;
using System.Collections.Generic;

namespace DesignPatterns.Behavioral
{
    // 抽象表达式
    public interface IExpression
    {
        int Interpret();
    }

    // 终结符表达式 - 数字
    public class NumberExpression : IExpression
    {
        private int _number;

        public NumberExpression(int number)
        {
            _number = number;
        }

        public int Interpret()
        {
            return _number;
        }
    }

    // 非终结符表达式 - 加法
    public class AddExpression : IExpression
    {
        private IExpression _left;
        private IExpression _right;

        public AddExpression(IExpression left, IExpression right)
        {
            _left = left;
            _right = right;
        }

        public int Interpret()
        {
            return _left.Interpret() + _right.Interpret();
        }
    }

    // 非终结符表达式 - 减法
    public class SubtractExpression : IExpression
    {
        private IExpression _left;
        private IExpression _right;

        public SubtractExpression(IExpression left, IExpression right)
        {
            _left = left;
            _right = right;
        }

        public int Interpret()
        {
            return _left.Interpret() - _right.Interpret();
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            // 计算: (5 + 3) - 2
            IExpression expr = new SubtractExpression(
                new AddExpression(
                    new NumberExpression(5),
                    new NumberExpression(3)
                ),
                new NumberExpression(2)
            );

            Console.WriteLine($"结果: {expr.Interpret()}");
        }
    }
}

/*
适用场景:
- 简单语法解释
- 表达式求值
- SQL解析器
- 正则表达式
*/`,

    java: `// 解释器模式 - Java 实现

package com.designpatterns.behavioral;

interface Expression {
    int interpret();
}

class NumberExpression implements Expression {
    private int number;

    public NumberExpression(int number) {
        this.number = number;
    }

    public int interpret() {
        return number;
    }
}

class AddExpression implements Expression {
    private Expression left;
    private Expression right;

    public AddExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    public int interpret() {
        return left.interpret() + right.interpret();
    }
}

class SubtractExpression implements Expression {
    private Expression left;
    private Expression right;

    public SubtractExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    public int interpret() {
        return left.interpret() - right.interpret();
    }
}

class InterpreterDemo {
    public static void main(String[] args) {
        Expression expr = new SubtractExpression(
            new AddExpression(
                new NumberExpression(5),
                new NumberExpression(3)
            ),
            new NumberExpression(2)
        );
        
        System.out.println("结果: " + expr.interpret());
    }
}`,

    go: `// 解释器模式 - Go 实现

package interpreter

import "fmt"

type Expression interface {
    Interpret() int
}

type NumberExpression struct {
    number int
}

func NewNumberExpression(number int) *NumberExpression {
    return &NumberExpression{number: number}
}

func (n *NumberExpression) Interpret() int {
    return n.number
}

type AddExpression struct {
    left  Expression
    right Expression
}

func NewAddExpression(left, right Expression) *AddExpression {
    return &AddExpression{left: left, right: right}
}

func (a *AddExpression) Interpret() int {
    return a.left.Interpret() + a.right.Interpret()
}

type SubtractExpression struct {
    left  Expression
    right Expression
}

func NewSubtractExpression(left, right Expression) *SubtractExpression {
    return &SubtractExpression{left: left, right: right}
}

func (s *SubtractExpression) Interpret() int {
    return s.left.Interpret() - s.right.Interpret()
}

func Example() {
    expr := NewSubtractExpression(
        NewAddExpression(
            NewNumberExpression(5),
            NewNumberExpression(3),
        ),
        NewNumberExpression(2),
    )
    
    fmt.Printf("结果: %d\n", expr.Interpret())
}`,

    rust: `// 解释器模式 - Rust 实现

trait Expression {
    fn interpret(&self) -> i32;
}

struct NumberExpression {
    number: i32,
}

impl NumberExpression {
    fn new(number: i32) -> Self {
        NumberExpression { number }
    }
}

impl Expression for NumberExpression {
    fn interpret(&self) -> i32 {
        self.number
    }
}

struct AddExpression {
    left: Box<dyn Expression>,
    right: Box<dyn Expression>,
}

impl AddExpression {
    fn new(left: Box<dyn Expression>, right: Box<dyn Expression>) -> Self {
        AddExpression { left, right }
    }
}

impl Expression for AddExpression {
    fn interpret(&self) -> i32 {
        self.left.interpret() + self.right.interpret()
    }
}

struct SubtractExpression {
    left: Box<dyn Expression>,
    right: Box<dyn Expression>,
}

impl SubtractExpression {
    fn new(left: Box<dyn Expression>, right: Box<dyn Expression>) -> Self {
        SubtractExpression { left, right }
    }
}

impl Expression for SubtractExpression {
    fn interpret(&self) -> i32 {
        self.left.interpret() - self.right.interpret()
    }
}

fn main() {
    let expr = SubtractExpression::new(
        Box::new(AddExpression::new(
            Box::new(NumberExpression::new(5)),
            Box::new(NumberExpression::new(3)),
        )),
        Box::new(NumberExpression::new(2)),
    );
    
    println!("结果: {}", expr.interpret());
}`
  }
}
