// 结构型设计模式代码

export const structuralPatterns = {
  // ==================== 适配器模式 ====================
  adapter: {
    csharp: `// 适配器模式 - C# 实现
// Adapter Pattern

using System;

namespace DesignPatterns.Structural
{
    // 目标接口
    public interface ITarget
    {
        string Request();
    }

    // 需要适配的类
    public class Adaptee
    {
        public string SpecificRequest()
        {
            return "适配者的特殊请求";
        }
    }

    // 适配器类
    public class Adapter : ITarget
    {
        private readonly Adaptee _adaptee;

        public Adapter(Adaptee adaptee)
        {
            _adaptee = adaptee;
        }

        public string Request()
        {
            return $"适配器: {_adaptee.SpecificRequest()}";
        }
    }

    // 实际场景：电源适配器
    public interface IUSBCharger
    {
        void ChargeWithUSB();
    }

    public class TypeCCharger
    {
        public void ChargeWithTypeC()
        {
            Console.WriteLine("使用 Type-C 接口充电");
        }
    }

    public class USBToTypeCAdapter : IUSBCharger
    {
        private readonly TypeCCharger _typeC;

        public USBToTypeCAdapter(TypeCCharger typeC)
        {
            _typeC = typeC;
        }

        public void ChargeWithUSB()
        {
            Console.WriteLine("适配器转换: USB -> Type-C");
            _typeC.ChargeWithTypeC();
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            var typeC = new TypeCCharger();
            IUSBCharger adapter = new USBToTypeCAdapter(typeC);
            adapter.ChargeWithUSB();
        }
    }
}

/*
适用场景:
- 系统集成
- 第三方库适配
- 接口不兼容
*/`,

    java: `// 适配器模式 - Java 实现

package com.designpatterns.structural;

interface Target {
    String request();
}

class Adaptee {
    String specificRequest() {
        return "适配者的特殊请求";
    }
}

class Adapter implements Target {
    private Adaptee adaptee;

    public Adapter(Adaptee adaptee) {
        this.adaptee = adaptee;
    }

    public String request() {
        return "适配器: " + adaptee.specificRequest();
    }
}

interface USBCharger {
    void chargeWithUSB();
}

class TypeCCharger {
    void chargeWithTypeC() {
        System.out.println("使用 Type-C 接口充电");
    }
}

class USBToTypeCAdapter implements USBCharger {
    private TypeCCharger typeC;

    public USBToTypeCAdapter(TypeCCharger typeC) {
        this.typeC = typeC;
    }

    public void chargeWithUSB() {
        System.out.println("适配器转换: USB -> Type-C");
        typeC.chargeWithTypeC();
    }
}`,

    go: `// 适配器模式 - Go 实现

package adapter

import "fmt"

type Target interface {
    Request() string
}

type Adaptee struct{}

func (a *Adaptee) SpecificRequest() string {
    return "适配者的特殊请求"
}

type Adapter struct {
    adaptee *Adaptee
}

func NewAdapter(adaptee *Adaptee) *Adapter {
    return &Adapter{adaptee: adaptee}
}

func (a *Adapter) Request() string {
    return fmt.Sprintf("适配器: %s", a.adaptee.SpecificRequest())
}

type USBCharger interface {
    ChargeWithUSB()
}

type TypeCCharger struct{}

func (t *TypeCCharger) ChargeWithTypeC() {
    fmt.Println("使用 Type-C 接口充电")
}

type USBToTypeCAdapter struct {
    typeC *TypeCCharger
}

func NewUSBToTypeCAdapter(typeC *TypeCCharger) *USBToTypeCAdapter {
    return &USBToTypeCAdapter{typeC: typeC}
}

func (a *USBToTypeCAdapter) ChargeWithUSB() {
    fmt.Println("适配器转换: USB -> Type-C")
    a.typeC.ChargeWithTypeC()
}`,

    rust: `// 适配器模式 - Rust 实现

trait Target {
    fn request(&self) -> String;
}

struct Adaptee;

impl Adaptee {
    fn specific_request(&self) -> String {
        "适配者的特殊请求".to_string()
    }
}

struct Adapter {
    adaptee: Adaptee,
}

impl Adapter {
    fn new(adaptee: Adaptee) -> Self {
        Adapter { adaptee }
    }
}

impl Target for Adapter {
    fn request(&self) -> String {
        format!("适配器: {}", self.adaptee.specific_request())
    }
}

trait USBCharger {
    fn charge_with_usb(&self);
}

struct TypeCCharger;

impl TypeCCharger {
    fn charge_with_type_c(&self) {
        println!("使用 Type-C 接口充电");
    }
}

struct USBToTypeCAdapter {
    type_c: TypeCCharger,
}

impl USBCharger for USBToTypeCAdapter {
    fn charge_with_usb(&self) {
        println!("适配器转换: USB -> Type-C");
        self.type_c.charge_with_type_c();
    }
}`
  },

  // ==================== 装饰器模式 ====================
  decorator: {
    csharp: `// 装饰器模式 - C# 实现
// Decorator Pattern

using System;

namespace DesignPatterns.Structural
{
    // 组件接口
    public interface ICoffee
    {
        string GetDescription();
        double GetCost();
    }

    // 具体组件
    public class SimpleCoffee : ICoffee
    {
        public string GetDescription()
        {
            return "简单咖啡";
        }

        public double GetCost()
        {
            return 10.0;
        }
    }

    // 抽象装饰器
    public abstract class CoffeeDecorator : ICoffee
    {
        protected ICoffee _coffee;

        public CoffeeDecorator(ICoffee coffee)
        {
            _coffee = coffee;
        }

        public virtual string GetDescription()
        {
            return _coffee.GetDescription();
        }

        public virtual double GetCost()
        {
            return _coffee.GetCost();
        }
    }

    // 具体装饰器 - 牛奶
    public class MilkDecorator : CoffeeDecorator
    {
        public MilkDecorator(ICoffee coffee) : base(coffee) { }

        public override string GetDescription()
        {
            return _coffee.GetDescription() + ", 牛奶";
        }

        public override double GetCost()
        {
            return _coffee.GetCost() + 2.0;
        }
    }

    // 具体装饰器 - 糖
    public class SugarDecorator : CoffeeDecorator
    {
        public SugarDecorator(ICoffee coffee) : base(coffee) { }

        public override string GetDescription()
        {
            return _coffee.GetDescription() + ", 糖";
        }

        public override double GetCost()
        {
            return _coffee.GetCost() + 1.0;
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            ICoffee coffee = new SimpleCoffee();
            Console.WriteLine($"{coffee.GetDescription()} - ¥{coffee.GetCost()}");

            coffee = new MilkDecorator(coffee);
            Console.WriteLine($"{coffee.GetDescription()} - ¥{coffee.GetCost()}");

            coffee = new SugarDecorator(coffee);
            Console.WriteLine($"{coffee.GetDescription()} - ¥{coffee.GetCost()}");
        }
    }
}

/*
适用场景:
- 动态添加功能
- 避免类爆炸
- IO流处理
*/`,

    java: `// 装饰器模式 - Java 实现

package com.designpatterns.structural;

interface Coffee {
    String getDescription();
    double getCost();
}

class SimpleCoffee implements Coffee {
    public String getDescription() {
        return "简单咖啡";
    }
    
    public double getCost() {
        return 10.0;
    }
}

abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee;
    
    public CoffeeDecorator(Coffee coffee) {
        this.coffee = coffee;
    }
    
    public String getDescription() {
        return coffee.getDescription();
    }
    
    public double getCost() {
        return coffee.getCost();
    }
}

class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }
    
    public String getDescription() {
        return coffee.getDescription() + ", 牛奶";
    }
    
    public double getCost() {
        return coffee.getCost() + 2.0;
    }
}

class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }
    
    public String getDescription() {
        return coffee.getDescription() + ", 糖";
    }
    
    public double getCost() {
        return coffee.getCost() + 1.0;
    }
}`,

    go: `// 装饰器模式 - Go 实现

package decorator

import "fmt"

type Coffee interface {
    GetDescription() string
    GetCost() float64
}

type SimpleCoffee struct{}

func (c *SimpleCoffee) GetDescription() string {
    return "简单咖啡"
}

func (c *SimpleCoffee) GetCost() float64 {
    return 10.0
}

type MilkDecorator struct {
    coffee Coffee
}

func NewMilkDecorator(coffee Coffee) *MilkDecorator {
    return &MilkDecorator{coffee: coffee}
}

func (m *MilkDecorator) GetDescription() string {
    return m.coffee.GetDescription() + ", 牛奶"
}

func (m *MilkDecorator) GetCost() float64 {
    return m.coffee.GetCost() + 2.0
}

type SugarDecorator struct {
    coffee Coffee
}

func NewSugarDecorator(coffee Coffee) *SugarDecorator {
    return &SugarDecorator{coffee: coffee}
}

func (s *SugarDecorator) GetDescription() string {
    return s.coffee.GetDescription() + ", 糖"
}

func (s *SugarDecorator) GetCost() float64 {
    return s.coffee.GetCost() + 1.0
}

func Example() {
    var coffee Coffee = &SimpleCoffee{}
    fmt.Printf("%s - ¥%.2f\\n", coffee.GetDescription(), coffee.GetCost())
    
    coffee = NewMilkDecorator(coffee)
    fmt.Printf("%s - ¥%.2f\\n", coffee.GetDescription(), coffee.GetCost())
    
    coffee = NewSugarDecorator(coffee)
    fmt.Printf("%s - ¥%.2f\\n", coffee.GetDescription(), coffee.GetCost())
}`,

    rust: `// 装饰器模式 - Rust 实现

trait Coffee {
    fn get_description(&self) -> String;
    fn get_cost(&self) -> f64;
}

struct SimpleCoffee;

impl Coffee for SimpleCoffee {
    fn get_description(&self) -> String {
        "简单咖啡".to_string()
    }
    
    fn get_cost(&self) -> f64 {
        10.0
    }
}

struct MilkDecorator {
    coffee: Box<dyn Coffee>,
}

impl MilkDecorator {
    fn new(coffee: Box<dyn Coffee>) -> Self {
        MilkDecorator { coffee }
    }
}

impl Coffee for MilkDecorator {
    fn get_description(&self) -> String {
        format!("{}, 牛奶", self.coffee.get_description())
    }
    
    fn get_cost(&self) -> f64 {
        self.coffee.get_cost() + 2.0
    }
}

struct SugarDecorator {
    coffee: Box<dyn Coffee>,
}

impl SugarDecorator {
    fn new(coffee: Box<dyn Coffee>) -> Self {
        SugarDecorator { coffee }
    }
}

impl Coffee for SugarDecorator {
    fn get_description(&self) -> String {
        format!("{}, 糖", self.coffee.get_description())
    }
    
    fn get_cost(&self) -> f64 {
        self.coffee.get_cost() + 1.0
    }
}

fn main() {
    let mut coffee: Box<dyn Coffee> = Box::new(SimpleCoffee);
    println!("{} - ¥{}", coffee.get_description(), coffee.get_cost());
    
    coffee = Box::new(MilkDecorator::new(coffee));
    println!("{} - ¥{}", coffee.get_description(), coffee.get_cost());
    
    coffee = Box::new(SugarDecorator::new(coffee));
    println!("{} - ¥{}", coffee.get_description(), coffee.get_cost());
}`
  },

  // ==================== 代理模式 ====================
  proxy: {
    csharp: `// 代理模式 - C# 实现
// Proxy Pattern

using System;

namespace DesignPatterns.Structural
{
    // 主题接口
    public interface IImage
    {
        void Display();
    }

    // 真实主题
    public class RealImage : IImage
    {
        private string _filename;

        public RealImage(string filename)
        {
            _filename = filename;
            LoadFromDisk();
        }

        private void LoadFromDisk()
        {
            Console.WriteLine($"从磁盘加载图片: {_filename}");
        }

        public void Display()
        {
            Console.WriteLine($"显示图片: {_filename}");
        }
    }

    // 代理
    public class ProxyImage : IImage
    {
        private RealImage _realImage;
        private string _filename;

        public ProxyImage(string filename)
        {
            _filename = filename;
        }

        public void Display()
        {
            if (_realImage == null)
            {
                _realImage = new RealImage(_filename);
            }
            _realImage.Display();
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            IImage image = new ProxyImage("test.jpg");
            
            // 首次显示，会加载图片
            image.Display();
            Console.WriteLine();
            
            // 再次显示，使用缓存
            image.Display();
        }
    }
}

/*
适用场景:
- 虚拟代理（延迟加载）
- 保护代理（权限控制）
- 远程代理（RPC）
- 智能引用
*/`,

    java: `// 代理模式 - Java 实现

package com.designpatterns.structural;

interface Image {
    void display();
}

class RealImage implements Image {
    private String filename;

    public RealImage(String filename) {
        this.filename = filename;
        loadFromDisk();
    }

    private void loadFromDisk() {
        System.out.println("从磁盘加载图片: " + filename);
    }

    public void display() {
        System.out.println("显示图片: " + filename);
    }
}

class ProxyImage implements Image {
    private RealImage realImage;
    private String filename;

    public ProxyImage(String filename) {
        this.filename = filename;
    }

    public void display() {
        if (realImage == null) {
            realImage = new RealImage(filename);
        }
        realImage.display();
    }
}

class ProxyDemo {
    public static void main(String[] args) {
        Image image = new ProxyImage("test.jpg");
        
        image.display();
        System.out.println();
        image.display();
    }
}`,

    go: `// 代理模式 - Go 实现

package proxy

import "fmt"

type Image interface {
    Display()
}

type RealImage struct {
    filename string
}

func NewRealImage(filename string) *RealImage {
    img := &RealImage{filename: filename}
    img.loadFromDisk()
    return img
}

func (img *RealImage) loadFromDisk() {
    fmt.Printf("从磁盘加载图片: %s\\n", img.filename)
}

func (img *RealImage) Display() {
    fmt.Printf("显示图片: %s\\n", img.filename)
}

type ProxyImage struct {
    realImage *RealImage
    filename  string
}

func NewProxyImage(filename string) *ProxyImage {
    return &ProxyImage{filename: filename}
}

func (proxy *ProxyImage) Display() {
    if proxy.realImage == nil {
        proxy.realImage = NewRealImage(proxy.filename)
    }
    proxy.realImage.Display()
}`,

    rust: `// 代理模式 - Rust 实现

trait Image {
    fn display(&self);
}

struct RealImage {
    filename: String,
}

impl RealImage {
    fn new(filename: String) -> Self {
        let img = RealImage { filename };
        img.load_from_disk();
        img
    }

    fn load_from_disk(&self) {
        println!("从磁盘加载图片: {}", self.filename);
    }
}

impl Image for RealImage {
    fn display(&self) {
        println!("显示图片: {}", self.filename);
    }
}

struct ProxyImage {
    real_image: Option<RealImage>,
    filename: String,
}

impl ProxyImage {
    fn new(filename: String) -> Self {
        ProxyImage {
            real_image: None,
            filename,
        }
    }
}

impl Image for ProxyImage {
    fn display(&self) {
        let img = self.real_image.get_or_insert_with(|| {
            RealImage::new(self.filename.clone())
        });
        img.display();
    }
}`
  },

  // ==================== 外观模式 ====================
  facade: {
    csharp: `// 外观模式 - C# 实现
// Facade Pattern

using System;

namespace DesignPatterns.Structural
{
    // 子系统类
    public class CPU
    {
        public void Freeze() => Console.WriteLine("CPU: 冻结");
        public void Jump(long position) => Console.WriteLine($"CPU: 跳转到 {position}");
        public void Execute() => Console.WriteLine("CPU: 执行");
    }

    public class Memory
    {
        public void Load(long position, byte[] data)
        {
            Console.WriteLine($"内存: 加载数据到 {position}");
        }
    }

    public class HardDrive
    {
        public byte[] Read(long lba, int size)
        {
            Console.WriteLine($"硬盘: 读取 {size} 字节从 {lba}");
            return new byte[size];
        }
    }

    // 外观类
    public class ComputerFacade
    {
        private CPU _cpu;
        private Memory _memory;
        private HardDrive _hardDrive;

        public ComputerFacade()
        {
            _cpu = new CPU();
            _memory = new Memory();
            _hardDrive = new HardDrive();
        }

        public void Start()
        {
            Console.WriteLine("启动计算机...");
            _cpu.Freeze();
            _memory.Load(0, _hardDrive.Read(0, 1024));
            _cpu.Jump(0);
            _cpu.Execute();
            Console.WriteLine("计算机启动完成!");
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            var computer = new ComputerFacade();
            computer.Start();
        }
    }
}

/*
适用场景:
- 简化复杂系统
- 分层架构
- 统一接口
*/`,

    java: `// 外观模式 - Java 实现

package com.designpatterns.structural;

class CPU {
    void freeze() {
        System.out.println("CPU: 冻结");
    }
    
    void jump(long position) {
        System.out.println("CPU: 跳转到 " + position);
    }
    
    void execute() {
        System.out.println("CPU: 执行");
    }
}

class Memory {
    void load(long position, byte[] data) {
        System.out.println("内存: 加载数据到 " + position);
    }
}

class HardDrive {
    byte[] read(long lba, int size) {
        System.out.println("硬盘: 读取 " + size + " 字节从 " + lba);
        return new byte[size];
    }
}

class ComputerFacade {
    private CPU cpu;
    private Memory memory;
    private HardDrive hardDrive;

    public ComputerFacade() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.hardDrive = new HardDrive();
    }

    public void start() {
        System.out.println("启动计算机...");
        cpu.freeze();
        memory.load(0, hardDrive.read(0, 1024));
        cpu.jump(0);
        cpu.execute();
        System.out.println("计算机启动完成!");
    }
}`,

    go: `// 外观模式 - Go 实现

package facade

import "fmt"

type CPU struct{}

func (c *CPU) Freeze() {
    fmt.Println("CPU: 冻结")
}

func (c *CPU) Jump(position int64) {
    fmt.Printf("CPU: 跳转到 %d\\n", position)
}

func (c *CPU) Execute() {
    fmt.Println("CPU: 执行")
}

type Memory struct{}

func (m *Memory) Load(position int64, data []byte) {
    fmt.Printf("内存: 加载数据到 %d\\n", position)
}

type HardDrive struct{}

func (h *HardDrive) Read(lba int64, size int) []byte {
    fmt.Printf("硬盘: 读取 %d 字节从 %d\\n", size, lba)
    return make([]byte, size)
}

type ComputerFacade struct {
    cpu       *CPU
    memory    *Memory
    hardDrive *HardDrive
}

func NewComputerFacade() *ComputerFacade {
    return &ComputerFacade{
        cpu:       &CPU{},
        memory:    &Memory{},
        hardDrive: &HardDrive{},
    }
}

func (c *ComputerFacade) Start() {
    fmt.Println("启动计算机...")
    c.cpu.Freeze()
    c.memory.Load(0, c.hardDrive.Read(0, 1024))
    c.cpu.Jump(0)
    c.cpu.Execute()
    fmt.Println("计算机启动完成!")
}`,

    rust: `// 外观模式 - Rust 实现

struct CPU;

impl CPU {
    fn freeze(&self) {
        println!("CPU: 冻结");
    }

    fn jump(&self, position: i64) {
        println!("CPU: 跳转到 {}", position);
    }

    fn execute(&self) {
        println!("CPU: 执行");
    }
}

struct Memory;

impl Memory {
    fn load(&self, position: i64, _data: &[u8]) {
        println!("内存: 加载数据到 {}", position);
    }
}

struct HardDrive;

impl HardDrive {
    fn read(&self, lba: i64, size: usize) -> Vec<u8> {
        println!("硬盘: 读取 {} 字节从 {}", size, lba);
        vec![0; size]
    }
}

struct ComputerFacade {
    cpu: CPU,
    memory: Memory,
    hard_drive: HardDrive,
}

impl ComputerFacade {
    fn new() -> Self {
        ComputerFacade {
            cpu: CPU,
            memory: Memory,
            hard_drive: HardDrive,
        }
    }

    fn start(&self) {
        println!("启动计算机...");
        self.cpu.freeze();
        let data = self.hard_drive.read(0, 1024);
        self.memory.load(0, &data);
        self.cpu.jump(0);
        self.cpu.execute();
        println!("计算机启动完成!");
    }
}`
  },

  // ==================== 桥接模式 ====================
  bridge: {
    csharp: `// 桥接模式 - C# 实现
// Bridge Pattern

using System;

namespace DesignPatterns.Structural
{
    // 实现接口
    public interface IColor
    {
        void ApplyColor();
    }

    // 具体实现A
    public class RedColor : IColor
    {
        public void ApplyColor()
        {
            Console.WriteLine("应用红色");
        }
    }

    // 具体实现B
    public class BlueColor : IColor
    {
        public void ApplyColor()
        {
            Console.WriteLine("应用蓝色");
        }
    }

    // 抽象类
    public abstract class Shape
    {
        protected IColor color;

        public Shape(IColor color)
        {
            this.color = color;
        }

        public abstract void Draw();
    }

    // 扩展抽象类
    public class Circle : Shape
    {
        public Circle(IColor color) : base(color) { }

        public override void Draw()
        {
            Console.Write("绘制圆形 - ");
            color.ApplyColor();
        }
    }

    public class Square : Shape
    {
        public Square(IColor color) : base(color) { }

        public override void Draw()
        {
            Console.Write("绘制正方形 - ");
            color.ApplyColor();
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            Shape redCircle = new Circle(new RedColor());
            Shape blueSquare = new Square(new BlueColor());

            redCircle.Draw();
            blueSquare.Draw();
        }
    }
}

/*
适用场景:
- 抽象和实现都需要扩展
- 避免类爆炸
- 多维度变化
*/`,

    java: `// 桥接模式 - Java 实现

package com.designpatterns.structural;

interface Color {
    void applyColor();
}

class RedColor implements Color {
    public void applyColor() {
        System.out.println("应用红色");
    }
}

class BlueColor implements Color {
    public void applyColor() {
        System.out.println("应用蓝色");
    }
}

abstract class Shape {
    protected Color color;

    public Shape(Color color) {
        this.color = color;
    }

    public abstract void draw();
}

class Circle extends Shape {
    public Circle(Color color) {
        super(color);
    }

    public void draw() {
        System.out.print("绘制圆形 - ");
        color.applyColor();
    }
}

class Square extends Shape {
    public Square(Color color) {
        super(color);
    }

    public void draw() {
        System.out.print("绘制正方形 - ");
        color.applyColor();
    }
}`,

    go: `// 桥接模式 - Go 实现

package bridge

import "fmt"

type Color interface {
    ApplyColor()
}

type RedColor struct{}

func (r *RedColor) ApplyColor() {
    fmt.Println("应用红色")
}

type BlueColor struct{}

func (b *BlueColor) ApplyColor() {
    fmt.Println("应用蓝色")
}

type Shape interface {
    Draw()
}

type Circle struct {
    color Color
}

func NewCircle(color Color) *Circle {
    return &Circle{color: color}
}

func (c *Circle) Draw() {
    fmt.Print("绘制圆形 - ")
    c.color.ApplyColor()
}

type Square struct {
    color Color
}

func NewSquare(color Color) *Square {
    return &Square{color: color}
}

func (s *Square) Draw() {
    fmt.Print("绘制正方形 - ")
    s.color.ApplyColor()
}`,

    rust: `// 桥接模式 - Rust 实现

trait Color {
    fn apply_color(&self);
}

struct RedColor;

impl Color for RedColor {
    fn apply_color(&self) {
        println!("应用红色");
    }
}

struct BlueColor;

impl Color for BlueColor {
    fn apply_color(&self) {
        println!("应用蓝色");
    }
}

trait Shape {
    fn draw(&self);
}

struct Circle {
    color: Box<dyn Color>,
}

impl Circle {
    fn new(color: Box<dyn Color>) -> Self {
        Circle { color }
    }
}

impl Shape for Circle {
    fn draw(&self) {
        print!("绘制圆形 - ");
        self.color.apply_color();
    }
}

struct Square {
    color: Box<dyn Color>,
}

impl Square {
    fn new(color: Box<dyn Color>) -> Self {
        Square { color }
    }
}

impl Shape for Square {
    fn draw(&self) {
        print!("绘制正方形 - ");
        self.color.apply_color();
    }
}`
  },

  // ==================== 组合模式 ====================
  composite: {
    csharp: `// 组合模式 - C# 实现
// Composite Pattern

using System;
using System.Collections.Generic;

namespace DesignPatterns.Structural
{
    // 组件接口
    public abstract class FileSystemItem
    {
        protected string name;

        public FileSystemItem(string name)
        {
            this.name = name;
        }

        public abstract void Display(int depth);
        public abstract int GetSize();
    }

    // 叶子节点
    public class File : FileSystemItem
    {
        private int size;

        public File(string name, int size) : base(name)
        {
            this.size = size;
        }

        public override void Display(int depth)
        {
            Console.WriteLine(new String('-', depth) + name + $" ({size}KB)");
        }

        public override int GetSize()
        {
            return size;
        }
    }

    // 组合节点
    public class Directory : FileSystemItem
    {
        private List<FileSystemItem> children = new List<FileSystemItem>();

        public Directory(string name) : base(name) { }

        public void Add(FileSystemItem item)
        {
            children.Add(item);
        }

        public void Remove(FileSystemItem item)
        {
            children.Remove(item);
        }

        public override void Display(int depth)
        {
            Console.WriteLine(new String('-', depth) + name + "/");
            foreach (var item in children)
            {
                item.Display(depth + 2);
            }
        }

        public override int GetSize()
        {
            int total = 0;
            foreach (var item in children)
            {
                total += item.GetSize();
            }
            return total;
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            var root = new Directory("root");
            var home = new Directory("home");
            var documents = new Directory("documents");

            home.Add(new File("photo.jpg", 200));
            documents.Add(new File("report.pdf", 500));
            documents.Add(new File("note.txt", 10));

            home.Add(documents);
            root.Add(home);

            root.Display(0);
            Console.WriteLine($"\n总大小: {root.GetSize()}KB");
        }
    }
}

/*
适用场景:
- 树形结构
- 部分-整体层次结构
- 文件系统
*/`,

    java: `// 组合模式 - Java 实现

package com.designpatterns.structural;

import java.util.*;

abstract class FileSystemItem {
    protected String name;

    public FileSystemItem(String name) {
        this.name = name;
    }

    public abstract void display(int depth);
    public abstract int getSize();
}

class File extends FileSystemItem {
    private int size;

    public File(String name, int size) {
        super(name);
        this.size = size;
    }

    public void display(int depth) {
        System.out.println("-".repeat(depth) + name + " (" + size + "KB)");
    }

    public int getSize() {
        return size;
    }
}

class Directory extends FileSystemItem {
    private List<FileSystemItem> children = new ArrayList<>();

    public Directory(String name) {
        super(name);
    }

    public void add(FileSystemItem item) {
        children.add(item);
    }

    public void remove(FileSystemItem item) {
        children.remove(item);
    }

    public void display(int depth) {
        System.out.println("-".repeat(depth) + name + "/");
        for (FileSystemItem item : children) {
            item.display(depth + 2);
        }
    }

    public int getSize() {
        int total = 0;
        for (FileSystemItem item : children) {
            total += item.getSize();
        }
        return total;
    }
}`,

    go: `// 组合模式 - Go 实现

package composite

import (
    "fmt"
    "strings"
)

type FileSystemItem interface {
    Display(depth int)
    GetSize() int
}

type File struct {
    name string
    size int
}

func NewFile(name string, size int) *File {
    return &File{name: name, size: size}
}

func (f *File) Display(depth int) {
    fmt.Printf("%s%s (%dKB)\n", strings.Repeat("-", depth), f.name, f.size)
}

func (f *File) GetSize() int {
    return f.size
}

type Directory struct {
    name     string
    children []FileSystemItem
}

func NewDirectory(name string) *Directory {
    return &Directory{name: name, children: make([]FileSystemItem, 0)}
}

func (d *Directory) Add(item FileSystemItem) {
    d.children = append(d.children, item)
}

func (d *Directory) Display(depth int) {
    fmt.Printf("%s%s/\n", strings.Repeat("-", depth), d.name)
    for _, item := range d.children {
        item.Display(depth + 2)
    }
}

func (d *Directory) GetSize() int {
    total := 0
    for _, item := range d.children {
        total += item.GetSize()
    }
    return total
}`,

    rust: `// 组合模式 - Rust 实现

trait FileSystemItem {
    fn display(&self, depth: usize);
    fn get_size(&self) -> i32;
}

struct File {
    name: String,
    size: i32,
}

impl File {
    fn new(name: String, size: i32) -> Self {
        File { name, size }
    }
}

impl FileSystemItem for File {
    fn display(&self, depth: usize) {
        println!("{}{} ({}KB)", "-".repeat(depth), self.name, self.size);
    }

    fn get_size(&self) -> i32 {
        self.size
    }
}

struct Directory {
    name: String,
    children: Vec<Box<dyn FileSystemItem>>,
}

impl Directory {
    fn new(name: String) -> Self {
        Directory {
            name,
            children: Vec::new(),
        }
    }

    fn add(&mut self, item: Box<dyn FileSystemItem>) {
        self.children.push(item);
    }
}

impl FileSystemItem for Directory {
    fn display(&self, depth: usize) {
        println!("{}{}/", "-".repeat(depth), self.name);
        for item in &self.children {
            item.display(depth + 2);
        }
    }

    fn get_size(&self) -> i32 {
        self.children.iter().map(|item| item.get_size()).sum()
    }
}`
  },

  // ==================== 享元模式 ====================
  flyweight: {
    csharp: `// 享元模式 - C# 实现
// Flyweight Pattern

using System;
using System.Collections.Generic;

namespace DesignPatterns.Structural
{
    // 享元接口
    public interface ITreeType
    {
        void Draw(int x, int y);
    }

    // 具体享元
    public class TreeType : ITreeType
    {
        private string name;
        private string color;
        private string texture;

        public TreeType(string name, string color, string texture)
        {
            this.name = name;
            this.color = color;
            this.texture = texture;
        }

        public void Draw(int x, int y)
        {
            Console.WriteLine($"在 ({x},{y}) 绘制 {color} {name} 树 [纹理: {texture}]");
        }
    }

    // 享元工厂
    public class TreeFactory
    {
        private static Dictionary<string, TreeType> treeTypes = new Dictionary<string, TreeType>();

        public static TreeType GetTreeType(string name, string color, string texture)
        {
            string key = $"{name}_{color}_{texture}";
            if (!treeTypes.ContainsKey(key))
            {
                treeTypes[key] = new TreeType(name, color, texture);
                Console.WriteLine($"创建新的树类型: {key}");
            }
            return treeTypes[key];
        }

        public static int GetTreeTypeCount()
        {
            return treeTypes.Count;
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            var tree1 = TreeFactory.GetTreeType("松树", "绿色", "rough");
            var tree2 = TreeFactory.GetTreeType("松树", "绿色", "rough");
            var tree3 = TreeFactory.GetTreeType("樱花", "粉色", "smooth");

            tree1.Draw(10, 20);
            tree2.Draw(30, 40);
            tree3.Draw(50, 60);

            Console.WriteLine($"\n总共创建了 {TreeFactory.GetTreeTypeCount()} 种树类型");
        }
    }
}

/*
适用场景:
- 大量相似对象
- 内存优化
- 游戏开发
*/`,

    java: `// 享元模式 - Java 实现

package com.designpatterns.structural;

import java.util.*;

interface TreeType {
    void draw(int x, int y);
}

class ConcreteTreeType implements TreeType {
    private String name;
    private String color;
    private String texture;

    public ConcreteTreeType(String name, String color, String texture) {
        this.name = name;
        this.color = color;
        this.texture = texture;
    }

    public void draw(int x, int y) {
        System.out.println("在 (" + x + "," + y + ") 绘制 " + color + " " + name + " 树 [纹理: " + texture + "]");
    }
}

class TreeFactory {
    private static Map<String, TreeType> treeTypes = new HashMap<>();

    public static TreeType getTreeType(String name, String color, String texture) {
        String key = name + "_" + color + "_" + texture;
        if (!treeTypes.containsKey(key)) {
            treeTypes.put(key, new ConcreteTreeType(name, color, texture));
            System.out.println("创建新的树类型: " + key);
        }
        return treeTypes.get(key);
    }

    public static int getTreeTypeCount() {
        return treeTypes.size();
    }
}`,

    go: `// 享元模式 - Go 实现

package flyweight

import "fmt"

type TreeType interface {
    Draw(x, y int)
}

type ConcreteTreeType struct {
    name    string
    color   string
    texture string
}

func (t *ConcreteTreeType) Draw(x, y int) {
    fmt.Printf("在 (%d,%d) 绘制 %s %s 树 [纹理: %s]\n", x, y, t.color, t.name, t.texture)
}

var treeTypes = make(map[string]*ConcreteTreeType)

func GetTreeType(name, color, texture string) *ConcreteTreeType {
    key := fmt.Sprintf("%s_%s_%s", name, color, texture)
    if tree, exists := treeTypes[key]; exists {
        return tree
    }
    tree := &ConcreteTreeType{name: name, color: color, texture: texture}
    treeTypes[key] = tree
    fmt.Printf("创建新的树类型: %s\n", key)
    return tree
}

func GetTreeTypeCount() int {
    return len(treeTypes)
}`,

    rust: `// 享元模式 - Rust 实现

use std::collections::HashMap;
use std::rc::Rc;

struct TreeType {
    name: String,
    color: String,
    texture: String,
}

impl TreeType {
    fn draw(&self, x: i32, y: i32) {
        println!("在 ({},{}) 绘制 {} {} 树 [纹理: {}]", x, y, self.color, self.name, self.texture);
    }
}

struct TreeFactory {
    tree_types: HashMap<String, Rc<TreeType>>,
}

impl TreeFactory {
    fn new() -> Self {
        TreeFactory {
            tree_types: HashMap::new(),
        }
    }

    fn get_tree_type(&mut self, name: &str, color: &str, texture: &str) -> Rc<TreeType> {
        let key = format!("{}_{}_{}"<boltend_54b40549-5498-493d-b08b-dc60b4558bc8>, name, color, texture);
        if let Some(tree_type) = self.tree_types.get(&key) {
            return Rc::clone(tree_type);
        }
        let tree_type = Rc::new(TreeType {
            name: name.to_string(),
            color: color.to_string(),
            texture: texture.to_string(),
        });
        self.tree_types.insert(key.clone(), Rc::clone(&tree_type));
        println!("创建新的树类型: {}", key);
        tree_type
    }

    fn get_tree_type_count(&self) -> usize {
        self.tree_types.len()
    }
}`
  }
}
