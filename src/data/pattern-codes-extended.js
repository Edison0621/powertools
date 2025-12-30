// 扩展的设计模式代码 - 其他21种模式的完整实现

export const extendedPatternCodes = {
  // ==================== 抽象工厂模式 ====================
  'abstract-factory': {
    csharp: `// 抽象工厂模式 - C# 实现
// Abstract Factory Pattern

using System;

namespace DesignPatterns.Creational
{
    // 抽象产品A
    public interface IButton
    {
        void Render();
    }

    // 抽象产品B
    public interface ICheckbox
    {
        void Render();
    }

    // 具体产品 - Windows按钮
    public class WindowsButton : IButton
    {
        public void Render()
        {
            Console.WriteLine("渲染 Windows 风格按钮");
        }
    }

    // 具体产品 - Mac按钮
    public class MacButton : IButton
    {
        public void Render()
        {
            Console.WriteLine("渲染 Mac 风格按钮");
        }
    }

    // 具体产品 - Windows复选框
    public class WindowsCheckbox : ICheckbox
    {
        public void Render()
        {
            Console.WriteLine("渲染 Windows 风格复选框");
        }
    }

    // 具体产品 - Mac复选框
    public class MacCheckbox : ICheckbox
    {
        public void Render()
        {
            Console.WriteLine("渲染 Mac 风格复选框");
        }
    }

    // 抽象工厂
    public interface IGUIFactory
    {
        IButton CreateButton();
        ICheckbox CreateCheckbox();
    }

    // 具体工厂 - Windows工厂
    public class WindowsFactory : IGUIFactory
    {
        public IButton CreateButton()
        {
            return new WindowsButton();
        }

        public ICheckbox CreateCheckbox()
        {
            return new WindowsCheckbox();
        }
    }

    // 具体工厂 - Mac工厂
    public class MacFactory : IGUIFactory
    {
        public IButton CreateButton()
        {
            return new MacButton();
        }

        public ICheckbox CreateCheckbox()
        {
            return new MacCheckbox();
        }
    }

    // 客户端代码
    public class Application
    {
        private IButton _button;
        private ICheckbox _checkbox;

        public Application(IGUIFactory factory)
        {
            _button = factory.CreateButton();
            _checkbox = factory.CreateCheckbox();
        }

        public void Render()
        {
            _button.Render();
            _checkbox.Render();
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            IGUIFactory factory;
            string os = "Windows"; // 或 "Mac"

            if (os == "Windows")
                factory = new WindowsFactory();
            else
                factory = new MacFactory();

            Application app = new Application(factory);
            app.Render();
        }
    }
}

/*
适用场景:
- 跨平台UI组件
- 数据库访问层（支持多种数据库）
- 主题系统
*/`,

    java: `// 抽象工厂模式 - Java 实现

package com.designpatterns.creational;

interface Button {
    void render();
}

interface Checkbox {
    void render();
}

class WindowsButton implements Button {
    public void render() {
        System.out.println("渲染 Windows 风格按钮");
    }
}

class MacButton implements Button {
    public void render() {
        System.out.println("渲染 Mac 风格按钮");
    }
}

class WindowsCheckbox implements Checkbox {
    public void render() {
        System.out.println("渲染 Windows 风格复选框");
    }
}

class MacCheckbox implements Checkbox {
    public void render() {
        System.out.println("渲染 Mac 风格复选框");
    }
}

interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

class WindowsFactory implements GUIFactory {
    public Button createButton() {
        return new WindowsButton();
    }
    
    public Checkbox createCheckbox() {
        return new WindowsCheckbox();
    }
}

class MacFactory implements GUIFactory {
    public Button createButton() {
        return new MacButton();
    }
    
    public Checkbox createCheckbox() {
        return new MacCheckbox();
    }
}

class Application {
    private Button button;
    private Checkbox checkbox;

    public Application(GUIFactory factory) {
        button = factory.createButton();
        checkbox = factory.createCheckbox();
    }

    public void render() {
        button.render();
        checkbox.render();
    }
}`,

    go: `// 抽象工厂模式 - Go 实现

package abstractfactory

import "fmt"

type Button interface {
    Render()
}

type Checkbox interface {
    Render()
}

type WindowsButton struct{}

func (b *WindowsButton) Render() {
    fmt.Println("渲染 Windows 风格按钮")
}

type MacButton struct{}

func (b *MacButton) Render() {
    fmt.Println("渲染 Mac 风格按钮")
}

type WindowsCheckbox struct{}

func (c *WindowsCheckbox) Render() {
    fmt.Println("渲染 Windows 风格复选框")
}

type MacCheckbox struct{}

func (c *MacCheckbox) Render() {
    fmt.Println("渲染 Mac 风格复选框")
}

type GUIFactory interface {
    CreateButton() Button
    CreateCheckbox() Checkbox
}

type WindowsFactory struct{}

func (f *WindowsFactory) CreateButton() Button {
    return &WindowsButton{}
}

func (f *WindowsFactory) CreateCheckbox() Checkbox {
    return &WindowsCheckbox{}
}

type MacFactory struct{}

func (f *MacFactory) CreateButton() Button {
    return &MacButton{}
}

func (f *MacFactory) CreateCheckbox() Checkbox {
    return &MacCheckbox{}
}

type Application struct {
    button   Button
    checkbox Checkbox
}

func NewApplication(factory GUIFactory) *Application {
    return &Application{
        button:   factory.CreateButton(),
        checkbox: factory.CreateCheckbox(),
    }
}

func (a *Application) Render() {
    a.button.Render()
    a.checkbox.Render()
}`,

    rust: `// 抽象工厂模式 - Rust 实现

trait Button {
    fn render(&self);
}

trait Checkbox {
    fn render(&self);
}

struct WindowsButton;

impl Button for WindowsButton {
    fn render(&self) {
        println!("渲染 Windows 风格按钮");
    }
}

struct MacButton;

impl Button for MacButton {
    fn render(&self) {
        println!("渲染 Mac 风格按钮");
    }
}

struct WindowsCheckbox;

impl Checkbox for WindowsCheckbox {
    fn render(&self) {
        println!("渲染 Windows 风格复选框");
    }
}

struct MacCheckbox;

impl Checkbox for MacCheckbox {
    fn render(&self) {
        println!("渲染 Mac 风格复选框");
    }
}

trait GUIFactory {
    fn create_button(&self) -> Box<dyn Button>;
    fn create_checkbox(&self) -> Box<dyn Checkbox>;
}

struct WindowsFactory;

impl GUIFactory for WindowsFactory {
    fn create_button(&self) -> Box<dyn Button> {
        Box::new(WindowsButton)
    }
    
    fn create_checkbox(&self) -> Box<dyn Checkbox> {
        Box::new(WindowsCheckbox)
    }
}

struct MacFactory;

impl GUIFactory for MacFactory {
    fn create_button(&self) -> Box<dyn Button> {
        Box::new(MacButton)
    }
    
    fn create_checkbox(&self) -> Box<dyn Checkbox> {
        Box::new(MacCheckbox)
    }
}

struct Application {
    button: Box<dyn Button>,
    checkbox: Box<dyn Checkbox>,
}

impl Application {
    fn new(factory: &dyn GUIFactory) -> Self {
        Application {
            button: factory.create_button(),
            checkbox: factory.create_checkbox(),
        }
    }
    
    fn render(&self) {
        self.button.render();
        self.checkbox.render();
    }
}`
  },

  // ==================== 建造者模式 ====================
  builder: {
    csharp: `// 建造者模式 - C# 实现
// Builder Pattern

using System;
using System.Text;

namespace DesignPatterns.Creational
{
    // 产品类
    public class Computer
    {
        public string CPU { get; set; }
        public string RAM { get; set; }
        public string Storage { get; set; }
        public string GPU { get; set; }
        public string Motherboard { get; set; }

        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.AppendLine("电脑配置:");
            sb.AppendLine($"CPU: {CPU}");
            sb.AppendLine($"内存: {RAM}");
            sb.AppendLine($"存储: {Storage}");
            sb.AppendLine($"显卡: {GPU}");
            sb.AppendLine($"主板: {Motherboard}");
            return sb.ToString();
        }
    }

    // 抽象建造者
    public interface IComputerBuilder
    {
        IComputerBuilder SetCPU(string cpu);
        IComputerBuilder SetRAM(string ram);
        IComputerBuilder SetStorage(string storage);
        IComputerBuilder SetGPU(string gpu);
        IComputerBuilder SetMotherboard(string motherboard);
        Computer Build();
    }

    // 具体建造者
    public class ComputerBuilder : IComputerBuilder
    {
        private Computer _computer = new Computer();

        public IComputerBuilder SetCPU(string cpu)
        {
            _computer.CPU = cpu;
            return this;
        }

        public IComputerBuilder SetRAM(string ram)
        {
            _computer.RAM = ram;
            return this;
        }

        public IComputerBuilder SetStorage(string storage)
        {
            _computer.Storage = storage;
            return this;
        }

        public IComputerBuilder SetGPU(string gpu)
        {
            _computer.GPU = gpu;
            return this;
        }

        public IComputerBuilder SetMotherboard(string motherboard)
        {
            _computer.Motherboard = motherboard;
            return this;
        }

        public Computer Build()
        {
            return _computer;
        }
    }

    // 指挥者（可选）
    public class Director
    {
        public Computer BuildGamingPC(IComputerBuilder builder)
        {
            return builder
                .SetCPU("Intel i9-13900K")
                .SetRAM("32GB DDR5")
                .SetStorage("2TB NVMe SSD")
                .SetGPU("RTX 4090")
                .SetMotherboard("ROG MAXIMUS Z790")
                .Build();
        }

        public Computer BuildOfficePC(IComputerBuilder builder)
        {
            return builder
                .SetCPU("Intel i5-13400")
                .SetRAM("16GB DDR4")
                .SetStorage("512GB SSD")
                .SetGPU("Intel UHD Graphics")
                .SetMotherboard("B760M")
                .Build();
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            var builder = new ComputerBuilder();
            var director = new Director();

            // 使用指挥者构建
            var gamingPC = director.BuildGamingPC(builder);
            Console.WriteLine(gamingPC);

            // 直接使用建造者
            var customPC = new ComputerBuilder()
                .SetCPU("AMD Ryzen 9 7950X")
                .SetRAM("64GB DDR5")
                .SetStorage("4TB SSD")
                .SetGPU("RX 7900 XTX")
                .SetMotherboard("X670E")
                .Build();
            Console.WriteLine(customPC);
        }
    }
}

/*
适用场景:
- 构建复杂对象
- 配置对象有多个可选参数
- 需要不同表示的对象
*/`,

    java: `// 建造者模式 - Java 实现

package com.designpatterns.creational;

class Computer {
    private String cpu;
    private String ram;
    private String storage;
    private String gpu;
    private String motherboard;

    public void setCPU(String cpu) { this.cpu = cpu; }
    public void setRAM(String ram) { this.ram = ram; }
    public void setStorage(String storage) { this.storage = storage; }
    public void setGPU(String gpu) { this.gpu = gpu; }
    public void setMotherboard(String mb) { this.motherboard = mb; }

    @Override
    public String toString() {
        return "电脑配置:\n" +
               "CPU: " + cpu + "\n" +
               "内存: " + ram + "\n" +
               "存储: " + storage + "\n" +
               "显卡: " + gpu + "\n" +
               "主板: " + motherboard;
    }

    // 静态内部建造者类
    public static class Builder {
        private Computer computer = new Computer();

        public Builder cpu(String cpu) {
            computer.setCPU(cpu);
            return this;
        }

        public Builder ram(String ram) {
            computer.setRAM(ram);
            return this;
        }

        public Builder storage(String storage) {
            computer.setStorage(storage);
            return this;
        }

        public Builder gpu(String gpu) {
            computer.setGPU(gpu);
            return this;
        }

        public Builder motherboard(String mb) {
            computer.setMotherboard(mb);
            return this;
        }

        public Computer build() {
            return computer;
        }
    }
}

class BuilderDemo {
    public static void main(String[] args) {
        Computer gamingPC = new Computer.Builder()
            .cpu("Intel i9-13900K")
            .ram("32GB DDR5")
            .storage("2TB NVMe SSD")
            .gpu("RTX 4090")
            .motherboard("ROG MAXIMUS Z790")
            .build();
        
        System.out.println(gamingPC);
    }
}`,

    go: `// 建造者模式 - Go 实现

package builder

import "fmt"

type Computer struct {
    CPU         string
    RAM         string
    Storage     string
    GPU         string
    Motherboard string
}

func (c *Computer) String() string {
    return fmt.Sprintf(
        "电脑配置:\nCPU: %s\n内存: %s\n存储: %s\n显卡: %s\n主板: %s",
        c.CPU, c.RAM, c.Storage, c.GPU, c.Motherboard,
    )
}

type ComputerBuilder struct {
    computer *Computer
}

func NewComputerBuilder() *ComputerBuilder {
    return &ComputerBuilder{
        computer: &Computer{},
    }
}

func (b *ComputerBuilder) SetCPU(cpu string) *ComputerBuilder {
    b.computer.CPU = cpu
    return b
}

func (b *ComputerBuilder) SetRAM(ram string) *ComputerBuilder {
    b.computer.RAM = ram
    return b
}

func (b *ComputerBuilder) SetStorage(storage string) *ComputerBuilder {
    b.computer.Storage = storage
    return b
}

func (b *ComputerBuilder) SetGPU(gpu string) *ComputerBuilder {
    b.computer.GPU = gpu
    return b
}

func (b *ComputerBuilder) SetMotherboard(mb string) *ComputerBuilder {
    b.computer.Motherboard = mb
    return b
}

func (b *ComputerBuilder) Build() *Computer {
    return b.computer
}

func Example() {
    computer := NewComputerBuilder().
        SetCPU("Intel i9-13900K").
        SetRAM("32GB DDR5").
        SetStorage("2TB NVMe SSD").
        SetGPU("RTX 4090").
        SetMotherboard("ROG MAXIMUS Z790").
        Build()
    
    fmt.Println(computer)
}`,

    rust: `// 建造者模式 - Rust 实现

use std::fmt;

#[derive(Default)]
struct Computer {
    cpu: String,
    ram: String,
    storage: String,
    gpu: String,
    motherboard: String,
}

impl fmt::Display for Computer {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "电脑配置:\nCPU: {}\n内存: {}\n存储: {}\n显卡: {}\n主板: {}",
            self.cpu, self.ram, self.storage, self.gpu, self.motherboard)
    }
}

struct ComputerBuilder {
    computer: Computer,
}

impl ComputerBuilder {
    fn new() -> Self {
        ComputerBuilder {
            computer: Computer::default(),
        }
    }

    fn cpu(mut self, cpu: &str) -> Self {
        self.computer.cpu = cpu.to_string();
        self
    }

    fn ram(mut self, ram: &str) -> Self {
        self.computer.ram = ram.to_string();
        self
    }

    fn storage(mut self, storage: &str) -> Self {
        self.computer.storage = storage.to_string();
        self
    }

    fn gpu(mut self, gpu: &str) -> Self {
        self.computer.gpu = gpu.to_string();
        self
    }

    fn motherboard(mut self, mb: &str) -> Self {
        self.computer.motherboard = mb.to_string();
        self
    }

    fn build(self) -> Computer {
        self.computer
    }
}

fn main() {
    let computer = ComputerBuilder::new()
        .cpu("Intel i9-13900K")
        .ram("32GB DDR5")
        .storage("2TB NVMe SSD")
        .gpu("RTX 4090")
        .motherboard("ROG MAXIMUS Z790")
        .build();
    
    println!("{}", computer);
}`
  },

  // ==================== 原型模式 ====================
  prototype: {
    csharp: `// 原型模式 - C# 实现
// Prototype Pattern

using System;

namespace DesignPatterns.Creational
{
    // 原型接口
    public interface IPrototype<T>
    {
        T Clone();
    }

    // 具体原型 - 形状
    public class Shape : IPrototype<Shape>
    {
        public string Type { get; set; }
        public string Color { get; set; }
        public int X { get; set; }
        public int Y { get; set; }

        public Shape() { }

        // 拷贝构造函数
        public Shape(Shape source)
        {
            Type = source.Type;
            Color = source.Color;
            X = source.X;
            Y = source.Y;
        }

        public Shape Clone()
        {
            return new Shape(this);
        }

        public override string ToString()
        {
            return $"[{Type}] 颜色:{Color}, 位置:({X},{Y})";
        }
    }

    // 具体原型 - 圆形
    public class Circle : Shape
    {
        public int Radius { get; set; }

        public Circle() { Type = "Circle"; }

        public Circle(Circle source) : base(source)
        {
            Radius = source.Radius;
        }

        public new Circle Clone()
        {
            return new Circle(this);
        }

        public override string ToString()
        {
            return base.ToString() + $", 半径:{Radius}";
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            // 创建原型
            var circle1 = new Circle
            {
                Color = "红色",
                X = 10,
                Y = 20,
                Radius = 15
            };

            Console.WriteLine("原始对象: " + circle1);

            // 克隆对象
            var circle2 = circle1.Clone();
            circle2.Color = "蓝色";
            circle2.X = 50;

            Console.WriteLine("克隆对象: " + circle2);
            Console.WriteLine("原始对象: " + circle1);

            // 验证是否为不同对象
            Console.WriteLine($"是否为同一对象: {ReferenceEquals(circle1, circle2)}");
        }
    }
}

/*
适用场景:
- 对象创建成本高
- 避免构造函数的约束
- 运行时动态加载类
*/`,

    java: `// 原型模式 - Java 实现

package com.designpatterns.creational;

abstract class Shape implements Cloneable {
    protected String type;
    protected String color;
    protected int x;
    protected int y;

    public Shape() {}

    public Shape(Shape source) {
        this.type = source.type;
        this.color = source.color;
        this.x = source.x;
        this.y = source.y;
    }

    @Override
    public Shape clone() {
        try {
            return (Shape) super.clone();
        } catch (CloneNotSupportedException e) {
            return null;
        }
    }

    @Override
    public String toString() {
        return String.format("[%s] 颜色:%s, 位置:(%d,%d)",
            type, color, x, y);
    }
}

class Circle extends Shape {
    private int radius;

    public Circle() {
        this.type = "Circle";
    }

    public Circle(Circle source) {
        super(source);
        this.radius = source.radius;
    }

    public void setRadius(int radius) {
        this.radius = radius;
    }

    public int getRadius() {
        return radius;
    }

    @Override
    public Circle clone() {
        return new Circle(this);
    }

    @Override
    public String toString() {
        return super.toString() + ", 半径:" + radius;
    }
}

class PrototypeDemo {
    public static void main(String[] args) {
        Circle circle1 = new Circle();
        circle1.color = "红色";
        circle1.x = 10;
        circle1.y = 20;
        circle1.setRadius(15);

        System.out.println("原始对象: " + circle1);

        Circle circle2 = circle1.clone();
        circle2.color = "蓝色";
        circle2.x = 50;

        System.out.println("克隆对象: " + circle2);
        System.out.println("是否为同一对象: " + (circle1 == circle2));
    }
}`,

    go: `// 原型模式 - Go 实现

package prototype

import "fmt"

type Cloneable interface {
    Clone() Cloneable
}

type Shape struct {
    Type  string
    Color string
    X     int
    Y     int
}

func (s *Shape) Clone() *Shape {
    return &Shape{
        Type:  s.Type,
        Color: s.Color,
        X:     s.X,
        Y:     s.Y,
    }
}

func (s *Shape) String() string {
    return fmt.Sprintf("[%s] 颜色:%s, 位置:(%d,%d)",
        s.Type, s.Color, s.X, s.Y)
}

type Circle struct {
    Shape
    Radius int
}

func NewCircle() *Circle {
    return &Circle{
        Shape: Shape{Type: "Circle"},
    }
}

func (c *Circle) Clone() *Circle {
    return &Circle{
        Shape:  *c.Shape.Clone(),
        Radius: c.Radius,
    }
}

func (c *Circle) String() string {
    return fmt.Sprintf("%s, 半径:%d", c.Shape.String(), c.Radius)
}

func Example() {
    circle1 := NewCircle()
    circle1.Color = "红色"
    circle1.X = 10
    circle1.Y = 20
    circle1.Radius = 15

    fmt.Println("原始对象:", circle1)

    circle2 := circle1.Clone()
    circle2.Color = "蓝色"
    circle2.X = 50

    fmt.Println("克隆对象:", circle2)
    fmt.Printf("是否为同一对象: %v\n", circle1 == circle2)
}`,

    rust: `// 原型模式 - Rust 实现

use std::fmt;

#[derive(Clone)]
struct Shape {
    shape_type: String,
    color: String,
    x: i32,
    y: i32,
}

impl Shape {
    fn new(shape_type: &str) -> Self {
        Shape {
            shape_type: shape_type.to_string(),
            color: String::new(),
            x: 0,
            y: 0,
        }
    }
}

impl fmt::Display for Shape {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "[{}] 颜色:{}, 位置:({},{})",
            self.shape_type, self.color, self.x, self.y)
    }
}

#[derive(Clone)]
struct Circle {
    shape: Shape,
    radius: i32,
}

impl Circle {
    fn new() -> Self {
        Circle {
            shape: Shape::new("Circle"),
            radius: 0,
        }
    }
}

impl fmt::Display for Circle {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}, 半径:{}", self.shape, self.radius)
    }
}

fn main() {
    let mut circle1 = Circle::new();
    circle1.shape.color = "红色".to_string();
    circle1.shape.x = 10;
    circle1.shape.y = 20;
    circle1.radius = 15;

    println!("原始对象: {}", circle1);

    let mut circle2 = circle1.clone();
    circle2.shape.color = "蓝色".to_string();
    circle2.shape.x = 50;

    println!("克隆对象: {}", circle2);
    println!("原始对象: {}", circle1);
}`
  },
  // ==================== 观察者模式 ====================
  observer: {
    csharp: `// 观察者模式 - C# 实现
// Observer Pattern

using System;
using System.Collections.Generic;

namespace DesignPatterns.Behavioral
{
    // 观察者接口
    public interface IObserver
    {
        void Update(string message);
    }

    // 主题接口
    public interface ISubject
    {
        void Attach(IObserver observer);
        void Detach(IObserver observer);
        void Notify();
    }

    // 具体主题
    public class ConcreteSubject : ISubject
    {
        private List<IObserver> observers = new List<IObserver>();
        private string _state;

        public string State
        {
            get { return _state; }
            set
            {
                _state = value;
                Notify();
            }
        }

        public void Attach(IObserver observer)
        {
            observers.Add(observer);
            Console.WriteLine("观察者已附加");
        }

        public void Detach(IObserver observer)
        {
            observers.Remove(observer);
            Console.WriteLine("观察者已分离");
        }

        public void Notify()
        {
            foreach (var observer in observers)
            {
                observer.Update(_state);
            }
        }
    }

    // 具体观察者
    public class ConcreteObserver : IObserver
    {
        private string _name;

        public ConcreteObserver(string name)
        {
            _name = name;
        }

        public void Update(string message)
        {
            Console.WriteLine($"{_name} 收到消息: {message}");
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            var subject = new ConcreteSubject();
            
            var observer1 = new ConcreteObserver("观察者1");
            var observer2 = new ConcreteObserver("观察者2");
            
            subject.Attach(observer1);
            subject.Attach(observer2);
            
            subject.State = "状态已更新";
        }
    }
}

/*
适用场景:
- 事件处理系统
- MVC模式中的数据绑定
- 发布-订阅系统
*/`,

    java: `// 观察者模式 - Java 实现

package com.designpatterns.behavioral;

import java.util.*;

interface Observer {
    void update(String message);
}

interface Subject {
    void attach(Observer observer);
    void detach(Observer observer);
    void notifyObservers();
}

class ConcreteSubject implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private String state;

    public void setState(String state) {
        this.state = state;
        notifyObservers();
    }

    public String getState() {
        return state;
    }

    public void attach(Observer observer) {
        observers.add(observer);
        System.out.println("观察者已附加");
    }

    public void detach(Observer observer) {
        observers.remove(observer);
        System.out.println("观察者已分离");
    }

    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(state);
        }
    }
}

class ConcreteObserver implements Observer {
    private String name;

    public ConcreteObserver(String name) {
        this.name = name;
    }

    public void update(String message) {
        System.out.println(name + " 收到消息: " + message);
    }
}`,

    go: `// 观察者模式 - Go 实现

package observer

import "fmt"

type Observer interface {
    Update(message string)
}

type Subject interface {
    Attach(observer Observer)
    Detach(observer Observer)
    Notify()
}

type ConcreteSubject struct {
    observers []Observer
    state     string
}

func (s *ConcreteSubject) SetState(state string) {
    s.state = state
    s.Notify()
}

func (s *ConcreteSubject) Attach(observer Observer) {
    s.observers = append(s.observers, observer)
    fmt.Println("观察者已附加")
}

func (s *ConcreteSubject) Detach(observer Observer) {
    for i, obs := range s.observers {
        if obs == observer {
            s.observers = append(s.observers[:i], s.observers[i+1:]...)
            break
        }
    }
}

func (s *ConcreteSubject) Notify() {
    for _, observer := range s.observers {
        observer.Update(s.state)
    }
}

type ConcreteObserver struct {
    name string
}

func NewConcreteObserver(name string) *ConcreteObserver {
    return &ConcreteObserver{name: name}
}

func (o *ConcreteObserver) Update(message string) {
    fmt.Printf("%s 收到消息: %s\\n", o.name, message)
}`,

    rust: `// 观察者模式 - Rust 实现

trait Observer {
    fn update(&self, message: &str);
}

struct ConcreteObserver {
    name: String,
}

impl Observer for ConcreteObserver {
    fn update(&self, message: &str) {
        println!("{} 收到消息: {}", self.name, message);
    }
}

struct Subject {
    observers: Vec<Box<dyn Observer>>,
    state: String,
}

impl Subject {
    fn new() -> Self {
        Subject {
            observers: Vec::new(),
            state: String::new(),
        }
    }

    fn attach(&mut self, observer: Box<dyn Observer>) {
        self.observers.push(observer);
        println!("观察者已附加");
    }

    fn set_state(&mut self, state: String) {
        self.state = state;
        self.notify();
    }

    fn notify(&self) {
        for observer in &self.observers {
            observer.update(&self.state);
        }
    }
}`
  },

  // ==================== 策略模式 ====================
  strategy: {
    csharp: `// 策略模式 - C# 实现
// Strategy Pattern

using System;

namespace DesignPatterns.Behavioral
{
    // 策略接口
    public interface IStrategy
    {
        int Execute(int a, int b);
    }

    // 具体策略 - 加法
    public class AddStrategy : IStrategy
    {
        public int Execute(int a, int b)
        {
            return a + b;
        }
    }

    // 具体策略 - 减法
    public class SubtractStrategy : IStrategy
    {
        public int Execute(int a, int b)
        {
            return a - b;
        }
    }

    // 具体策略 - 乘法
    public class MultiplyStrategy : IStrategy
    {
        public int Execute(int a, int b)
        {
            return a * b;
        }
    }

    // 上下文
    public class Context
    {
        private IStrategy _strategy;

        public Context(IStrategy strategy)
        {
            _strategy = strategy;
        }

        public void SetStrategy(IStrategy strategy)
        {
            _strategy = strategy;
        }

        public int ExecuteStrategy(int a, int b)
        {
            return _strategy.Execute(a, b);
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            var context = new Context(new AddStrategy());
            Console.WriteLine("10 + 5 = " + context.ExecuteStrategy(10, 5));

            context.SetStrategy(new SubtractStrategy());
            Console.WriteLine("10 - 5 = " + context.ExecuteStrategy(10, 5));

            context.SetStrategy(new MultiplyStrategy());
            Console.WriteLine("10 * 5 = " + context.ExecuteStrategy(10, 5));
        }
    }
}

/*
适用场景:
- 支付方式选择
- 排序算法选择
- 压缩算法选择
*/`,

    java: `// 策略模式 - Java 实现

package com.designpatterns.behavioral;

interface Strategy {
    int execute(int a, int b);
}

class AddStrategy implements Strategy {
    public int execute(int a, int b) {
        return a + b;
    }
}

class SubtractStrategy implements Strategy {
    public int execute(int a, int b) {
        return a - b;
    }
}

class MultiplyStrategy implements Strategy {
    public int execute(int a, int b) {
        return a * b;
    }
}

class Context {
    private Strategy strategy;

    public Context(Strategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(Strategy strategy) {
        this.strategy = strategy;
    }

    public int executeStrategy(int a, int b) {
        return strategy.execute(a, b);
    }
}

class StrategyDemo {
    public static void main(String[] args) {
        Context context = new Context(new AddStrategy());
        System.out.println("10 + 5 = " + context.executeStrategy(10, 5));

        context.setStrategy(new SubtractStrategy());
        System.out.println("10 - 5 = " + context.executeStrategy(10, 5));
    }
}`,

    go: `// 策略模式 - Go 实现

package strategy

import "fmt"

type Strategy interface {
    Execute(a, b int) int
}

type AddStrategy struct{}

func (s *AddStrategy) Execute(a, b int) int {
    return a + b
}

type SubtractStrategy struct{}

func (s *SubtractStrategy) Execute(a, b int) int {
    return a - b
}

type MultiplyStrategy struct{}

func (s *MultiplyStrategy) Execute(a, b int) int {
    return a * b
}

type Context struct {
    strategy Strategy
}

func NewContext(strategy Strategy) *Context {
    return &Context{strategy: strategy}
}

func (c *Context) SetStrategy(strategy Strategy) {
    c.strategy = strategy
}

func (c *Context) ExecuteStrategy(a, b int) int {
    return c.strategy.Execute(a, b)
}

func Example() {
    context := NewContext(&AddStrategy{})
    fmt.Printf("10 + 5 = %d\\n", context.ExecuteStrategy(10, 5))

    context.SetStrategy(&SubtractStrategy{})
    fmt.Printf("10 - 5 = %d\\n", context.ExecuteStrategy(10, 5))
}`,

    rust: `// 策略模式 - Rust 实现

trait Strategy {
    fn execute(&self, a: i32, b: i32) -> i32;
}

struct AddStrategy;

impl Strategy for AddStrategy {
    fn execute(&self, a: i32, b: i32) -> i32 {
        a + b
    }
}

struct SubtractStrategy;

impl Strategy for SubtractStrategy {
    fn execute(&self, a: i32, b: i32) -> i32 {
        a - b
    }
}

struct MultiplyStrategy;

impl Strategy for MultiplyStrategy {
    fn execute(&self, a: i32, b: i32) -> i32 {
        a * b
    }
}

struct Context {
    strategy: Box<dyn Strategy>,
}

impl Context {
    fn new(strategy: Box<dyn Strategy>) -> Self {
        Context { strategy }
    }

    fn set_strategy(&mut self, strategy: Box<dyn Strategy>) {
        self.strategy = strategy;
    }

    fn execute_strategy(&self, a: i32, b: i32) -> i32 {
        self.strategy.execute(a, b)
    }
}

fn main() {
    let mut context = Context::new(Box::new(AddStrategy));
    println!("10 + 5 = {}", context.execute_strategy(10, 5));

    context.set_strategy(Box::new(SubtractStrategy));
    println!("10 - 5 = {}", context.execute_strategy(10, 5));
}`
  }
}
