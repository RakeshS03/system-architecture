package org.example;

import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.infra.Blackhole;

import java.lang.reflect.Constructor;
import java.util.Random;
import java.util.concurrent.TimeUnit;


  //JMH microbench to compare optimized static call vs random/reflection dispatch

@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@Fork(value = 2)
@Warmup(iterations = 5)
@Measurement(iterations = 8)
@State(Scope.Benchmark)
public class Jmhdemo {

    

    public interface Worker {
        int compute(int x);
    }

    public static class WorkerA implements Worker { public int compute(int x) { return x + 1; } }
    public static class WorkerB implements Worker { public int compute(int x) { return x * 2; } }
    public static class WorkerC implements Worker { public int compute(int x) { return x - 3; } }
    public static class WorkerD implements Worker { public int compute(int x) { return x * x; } }

    // Fields used by benchmarks 

    private final Worker staticWorker = new WorkerA();          
    private final Worker[] workers = new Worker[] {            
        new WorkerA(), new WorkerB(), new WorkerC(), new WorkerD()
    };
    private final Random rnd = new Random(12345);            

    private final String[] classNames = new String[] {
        WorkerA.class.getName(),
        WorkerB.class.getName(),
        WorkerC.class.getName(),
        WorkerD.class.getName()
    };

    // Benchmarks 

    @Benchmark
    public void staticPath(Blackhole bh) {
        // This is the static, monomorphic call JIT can inline.
        int r = staticWorker.compute(10);
        bh.consume(r);
    }

    @Benchmark
    public void randomDispatch(Blackhole bh) {
        // Randomly pick an existing instance from array every invocation
        
        int idx = rnd.nextInt(workers.length);
        int r = workers[idx].compute(10);
        bh.consume(r);
    }

    @Benchmark
    public void reflectionDispatch(Blackhole bh) throws Exception {
        // Instantiate a class by name via reflection, then call compute.
        
        int idx = rnd.nextInt(classNames.length);
        String name = classNames[idx];
        Class<?> c = Class.forName(name);
        Constructor<?> ctor = c.getDeclaredConstructor();
        Object obj = ctor.newInstance();
        int r = ((Worker)obj).compute(10);
        bh.consume(r);
    }
}
