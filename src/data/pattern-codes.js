// 设计模式代码示例数据
// 所有代码以字符串形式存储,用于展示

import { extendedPatternCodes } from './pattern-codes-extended.js'
import { structuralPatterns } from './pattern-codes-structural.js'
import { behavioralPatterns } from './pattern-codes-behavioral.js'

export const patternCodes = {
  // ==================== 单例模式 ====================
  singleton: {
    csharp: `// 单例模式 - C# 实现
// Singleton Pattern - C# Implementation

using System;

namespace DesignPatterns.Creational
{
    /// <summary>
    /// 单例类 - 懒汉式（线程安全）
    /// 使用双重检查锁定确保线程安全
    /// </summary>
    public sealed class Singleton
    {
        private static Singleton _instance;
        private static readonly object _lock = new object();
        private int _value;

        private Singleton()
        {
            _value = new Random().Next(1, 1000);
            Console.WriteLine($"Singleton 实例已创建，初始值: {_value}");
        }

        public static Singleton Instance
        {
            get
            {
                if (_instance == null)
                {
                    lock (_lock)
                    {
                        if (_instance == null)
                        {
                            _instance = new Singleton();
                        }
                    }
                }
                return _instance;
            }
        }

        public int Value
        {
            get { return _value; }
            set { _value = value; }
        }
    }

    /// <summary>
    /// 使用 Lazy<T> 实现单例（推荐）
    /// </summary>
    public sealed class LazySingleton
    {
        private static readonly Lazy<LazySingleton> _instance = 
            new Lazy<LazySingleton>(() => new LazySingleton());

        private LazySingleton() { }

        public static LazySingleton Instance => _instance.Value;
    }
}

/*
优点:
1. 确保全局只有一个实例
2. 提供全局访问点
3. 延迟初始化，节省资源

适用场景:
- 配置管理器
- 日志记录器
- 数据库连接池
*/`,

    java: `// 单例模式 - Java 实现
// Singleton Pattern - Java Implementation

package com.designpatterns.creational;

/**
 * 单例类 - 双重检查锁定
 */
public class Singleton {
    private static volatile Singleton instance;
    private int value;

    private Singleton() {
        this.value = (int)(Math.random() * 1000);
        System.out.println("Singleton 实例已创建，初始值: " + value);
    }

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }

    public int getValue() { return value; }
    public void setValue(int value) { this.value = value; }
}

/**
 * 静态内部类方式（推荐）
 */
class StaticInnerSingleton {
    private StaticInnerSingleton() { }

    private static class SingletonHolder {
        private static final StaticInnerSingleton INSTANCE = 
            new StaticInnerSingleton();
    }

    public static StaticInnerSingleton getInstance() {
        return SingletonHolder.INSTANCE;
    }
}

/**
 * 枚举方式（最安全）
 */
enum EnumSingleton {
    INSTANCE;
    
    public void doSomething() {
        System.out.println("枚举单例方法执行");
    }
}`,

    go: `// 单例模式 - Go 实现
// Singleton Pattern - Go Implementation

package singleton

import (
    "fmt"
    "sync"
)

// 方式1: sync.Once（推荐）
type Singleton struct {
    value int
}

var (
    instance *Singleton
    once     sync.Once
)

func GetInstance() *Singleton {
    once.Do(func() {
        instance = &Singleton{value: 100}
        fmt.Println("Singleton 实例已创建")
    })
    return instance
}

func (s *Singleton) GetValue() int {
    return s.value
}

func (s *Singleton) SetValue(v int) {
    s.value = v
}

// 方式2: 饿汉式
var eagerInstance = &Singleton{value: 200}

func GetEagerInstance() *Singleton {
    return eagerInstance
}

// 使用示例
func Example() {
    s1 := GetInstance()
    s2 := GetInstance()
    
    fmt.Printf("s1 == s2: %v\\n", s1 == s2) // true
    
    s1.SetValue(300)
    fmt.Printf("s1.value = %d\\n", s1.GetValue())
    fmt.Printf("s2.value = %d\\n", s2.GetValue())
}`,

    rust: `// 单例模式 - Rust 实现
// Singleton Pattern - Rust Implementation

use std::sync::{Arc, Mutex};
use lazy_static::lazy_static;

// 方式1: lazy_static（推荐）
lazy_static! {
    static ref SINGLETON: Mutex<Singleton> = 
        Mutex::new(Singleton::new());
}

#[derive(Debug)]
struct Singleton {
    value: i32,
}

impl Singleton {
    fn new() -> Self {
        println!("Singleton 实例已创建");
        Singleton { value: 100 }
    }

    fn get_value(&self) -> i32 {
        self.value
    }

    fn set_value(&mut self, v: i32) {
        self.value = v;
    }
}

fn get_instance() -> &'static Mutex<Singleton> {
    &SINGLETON
}

// 使用示例
fn main() {
    let mut s1 = get_instance().lock().unwrap();
    s1.set_value(200);
    println!("s1.value = {}", s1.get_value());
    
    drop(s1);
    
    let s2 = get_instance().lock().unwrap();
    println!("s2.value = {}", s2.get_value());
}

/*
Cargo.toml:
[dependencies]
lazy_static = "1.4"
*/`
  },

  // ==================== 工厂方法模式 ====================
  factory: {
    csharp: `// 工厂方法模式 - C# 实现
// Factory Method Pattern

using System;

namespace DesignPatterns.Creational
{
    // 产品接口
    public interface IProduct
    {
        string GetName();
        void Use();
    }

    // 具体产品A
    public class ConcreteProductA : IProduct
    {
        public string GetName() => "产品 A";
        public void Use() => Console.WriteLine("使用产品 A");
    }

    // 具体产品B
    public class ConcreteProductB : IProduct
    {
        public string GetName() => "产品 B";
        public void Use() => Console.WriteLine("使用产品 B");
    }

    // 工厂接口
    public abstract class Factory
    {
        public abstract IProduct CreateProduct();
        
        public void DoSomething()
        {
            var product = CreateProduct();
            Console.WriteLine($"创建了: {product.GetName()}");
            product.Use();
        }
    }

    // 具体工厂A
    public class FactoryA : Factory
    {
        public override IProduct CreateProduct()
        {
            return new ConcreteProductA();
        }
    }

    // 具体工厂B
    public class FactoryB : Factory
    {
        public override IProduct CreateProduct()
        {
            return new ConcreteProductB();
        }
    }

    // 使用示例
    class Program
    {
        static void Main()
        {
            Factory factory = new FactoryA();
            factory.DoSomething();
            
            factory = new FactoryB();
            factory.DoSomething();
        }
    }
}`,

    java: `// 工厂方法模式 - Java 实现

package com.designpatterns.creational;

interface Product {
    String getName();
    void use();
}

class ConcreteProductA implements Product {
    public String getName() { return "产品 A"; }
    public void use() { 
        System.out.println("使用产品 A"); 
    }
}

class ConcreteProductB implements Product {
    public String getName() { return "产品 B"; }
    public void use() { 
        System.out.println("使用产品 B"); 
    }
}

abstract class Factory {
    public abstract Product createProduct();
    
    public void doSomething() {
        Product product = createProduct();
        System.out.println("创建了: " + product.getName());
        product.use();
    }
}

class FactoryA extends Factory {
    public Product createProduct() {
        return new ConcreteProductA();
    }
}

class FactoryB extends Factory {
    public Product createProduct() {
        return new ConcreteProductB();
    }
}`,

    go: `// 工厂方法模式 - Go 实现

package factory

import "fmt"

type Product interface {
    GetName() string
    Use()
}

type ConcreteProductA struct{}

func (p *ConcreteProductA) GetName() string {
    return "产品 A"
}

func (p *ConcreteProductA) Use() {
    fmt.Println("使用产品 A")
}

type ConcreteProductB struct{}

func (p *ConcreteProductB) GetName() string {
    return "产品 B"
}

func (p *ConcreteProductB) Use() {
    fmt.Println("使用产品 B")
}

type Factory interface {
    CreateProduct() Product
}

type FactoryA struct{}

func (f *FactoryA) CreateProduct() Product {
    return &ConcreteProductA{}
}

type FactoryB struct{}

func (f *FactoryB) CreateProduct() Product {
    return &ConcreteProductB{}
}`,

    rust: `// 工厂方法模式 - Rust 实现

trait Product {
    fn get_name(&self) -> &str;
    fn use_product(&self);
}

struct ConcreteProductA;

impl Product for ConcreteProductA {
    fn get_name(&self) -> &str {
        "产品 A"
    }
    
    fn use_product(&self) {
        println!("使用产品 A");
    }
}

struct ConcreteProductB;

impl Product for ConcreteProductB {
    fn get_name(&self) -> &str {
        "产品 B"
    }
    
    fn use_product(&self) {
        println!("使用产品 B");
    }
}

trait Factory {
    fn create_product(&self) -> Box<dyn Product>;
}

struct FactoryA;

impl Factory for FactoryA {
    fn create_product(&self) -> Box<dyn Product> {
        Box::new(ConcreteProductA)
    }
}

struct FactoryB;

impl Factory for FactoryB {
    fn create_product(&self) -> Box<dyn Product> {
        Box::new(ConcreteProductB)
    }
}`
  }
}

// 为其他模式添加占位代码
const placeholderCode = (patternName) => ({
  csharp: `// ${patternName} Pattern - C# 实现
// 代码示例即将添加...

/* 
${patternName}模式的C#实现将在此处展示
包含完整的代码示例和注释
*/`,
  java: `// ${patternName} Pattern - Java 实现
// 代码示例即将添加...

/* 
${patternName}模式的Java实现将在此处展示
包含完整的代码示例和注释
*/`,
  go: `// ${patternName} Pattern - Go 实现
// 代码示例即将添加...

/* 
${patternName}模式的Go实现将在此处展示
包含完整的代码示例和注释
*/`,
  rust: `// ${patternName} Pattern - Rust 实现
// 代码示例即将添加...

/* 
${patternName}模式的Rust实现将在此处展示
包含完整的代码示例和注释
*/`
})

// 其他模式的占位代码
patternCodes['abstract-factory'] = placeholderCode('Abstract Factory')
patternCodes.builder = placeholderCode('Builder')
patternCodes.prototype = placeholderCode('Prototype')
patternCodes.adapter = placeholderCode('Adapter')
patternCodes.bridge = placeholderCode('Bridge')
patternCodes.composite = placeholderCode('Composite')
patternCodes.decorator = placeholderCode('Decorator')
patternCodes.facade = placeholderCode('Facade')
patternCodes.flyweight = placeholderCode('Flyweight')
patternCodes.proxy = placeholderCode('Proxy')
patternCodes['chain-of-responsibility'] = placeholderCode('Chain of Responsibility')
patternCodes.command = placeholderCode('Command')
patternCodes.iterator = placeholderCode('Iterator')
patternCodes.mediator = placeholderCode('Mediator')
patternCodes.memento = placeholderCode('Memento')
patternCodes.state = placeholderCode('State')
patternCodes['template-method'] = placeholderCode('Template Method')
patternCodes.visitor = placeholderCode('Visitor')
patternCodes.interpreter = placeholderCode('Interpreter')

// 从扩展文件中导入完整实现
Object.assign(patternCodes, extendedPatternCodes)
Object.assign(patternCodes, structuralPatterns)
Object.assign(patternCodes, behavioralPatterns)
