<template>
  <div class="carousel-container">
    <div class="carousel" ref="carousel">
      <div class="carousel-inner" :style="carouselStyle">
        <div v-for="(slide, index) in slides" :key="index" class="carousel-slide">
          <div class="case-card">
            <img :src="slide.image" :alt="slide.title">
            <div class="case-content">
              <h3>{{ slide.title }}</h3>
              <p>{{ slide.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="carousel-btn prev" @click="prev">
      <i class="el-icon-arrow-left"></i>
    </button>
    <button class="carousel-btn next" @click="next">
      <i class="el-icon-arrow-right"></i>
    </button>
    <div class="carousel-indicators">
      <span 
        v-for="(_, index) in slides" 
        :key="index"
        :class="['indicator', { active: currentIndex === index }]"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    slides: {
      type: Array,
      required: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 5000
    }
  },
  data() {
    return {
      currentIndex: 0,
      timer: null
    }
  },
  computed: {
    carouselStyle() {
      return {
        transform: `translateX(-${this.currentIndex * 100}%)`,
        transition: 'transform 0.5s ease-in-out'
      }
    }
  },
  methods: {
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length
    },
    prev() {
      this.currentIndex = this.currentIndex === 0 
        ? this.slides.length - 1 
        : this.currentIndex - 1
    },
    goToSlide(index) {
      this.currentIndex = index
    },
    startAutoplay() {
      if (this.autoplay) {
        this.timer = setInterval(() => {
          this.next()
        }, this.interval)
      }
    },
    stopAutoplay() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    }
  },
  mounted() {
    this.startAutoplay()
  },
  beforeDestroy() {
    this.stopAutoplay()
  }
}
</script>

<style lang="scss" scoped>
.carousel-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.carousel {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.carousel-inner {
  display: flex;
  width: 100%;
  height: 100%;
}

.carousel-slide {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
}

.case-card {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(26, 26, 26, 0.7);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .case-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 30px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    color: #fff;
    
    h3 {
      font-size: 24px;
      margin-bottom: 10px;
      color: #40c9c6;
    }
    
    p {
      font-size: 16px;
      line-height: 1.6;
      margin: 0;
      opacity: 0.9;
    }
  }
  
  &:hover {
    img {
      transform: scale(1.05);
    }
  }
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(64, 201, 198, 0.2);
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(64, 201, 198, 0.4);
  }
  
  &.prev {
    left: 20px;
  }
  
  &.next {
    right: 20px;
  }
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  
  .indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
    
    &.active {
      background: #40c9c6;
      transform: scale(1.2);
    }
    
    &:hover {
      background: rgba(64, 201, 198, 0.5);
    }
  }
}

@media (max-width: 768px) {
  .carousel {
    height: 300px;
  }
  
  .case-card {
    .case-content {
      padding: 20px;
      
      h3 {
        font-size: 20px;
      }
      
      p {
        font-size: 14px;
      }
    }
  }
  
  .carousel-btn {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }
}
</style> 