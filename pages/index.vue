<template>
  <div class="min-h-screen relative overflow-hidden ">
<!--    &lt;!&ndash; Animated background elements &ndash;&gt;-->

    <!-- Grid pattern overlay -->
<!--    <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1.5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]> opacity-20"></div>-->

  <div class="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
    <div class="max-w-4xl w-full">
      <!-- Main content card -->
      <div class="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-purple-500/25 transition-all duration-700 hover:scale-[1.02] group">

        <!-- Logo section with enhanced animation -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 mb-6 shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:rotate-6 ">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>

          <h1 class="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200 mb-4 tracking-tight leading-tight hover:scale-105 transition-transform duration-300">
          S3  <span class="text-purple-400">Dashboard</span>
          </h1>

          <div class="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-6 hover:w-48 transition-all duration-500"></div>

          <p class="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Experience the future of <span class="text-purple-400 font-semibold">digital management</span> with our next-generation admin platform,
            developed by
            <a href="https://diligentcreators.com" target="_blank" class="underline text-purple-300 hover:text-purple-500 font-semibold transition">
             (dc) Diligentcreators
            </a>.
          </p>

        </div>

        <!-- Enhanced feature grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div class="group/card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover/card:rotate-12 transition-transform duration-300">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Smart Users</h3>
            <p class="text-gray-400 text-sm">Advanced user management with AI-powered insights and automation</p>
          </div>

          <div class="group/card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover/card:rotate-12 transition-transform duration-300">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Live Analytics</h3>
            <p class="text-gray-400 text-sm">Real-time data visualization with predictive analytics and custom dashboards</p>
          </div>

          <div class="group/card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mb-4 group-hover/card:rotate-12 transition-transform duration-300">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Auto Config</h3>
            <p class="text-gray-400 text-sm">Intelligent settings management with machine learning optimization</p>
          </div>
        </div>

        <!-- Enhanced CTA buttons -->
        <div class="flex flex-col sm:flex-row justify-center gap-6 mb-8">
          <NuxtLink
              to="/login"
              class="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transform"
          >
              <span class="relative z-10 flex items-center justify-center gap-2">
                <svg class="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                </svg>
                Sign In
              </span>
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </NuxtLink>

          <NuxtLink
              to="/register"
              class="group relative overflow-hidden bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 shadow-2xl hover:shadow-white/25 hover:scale-105 transform"
          >
              <span class="relative z-10 flex items-center justify-center gap-2">
                <svg class="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                </svg>
                Create Account
              </span>
            <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </NuxtLink>
        </div>

        <!-- Enhanced footer -->
<!--        <div class="text-center">-->
<!--          <p class="text-gray-400 text-sm mb-4">-->
<!--            Join <span class="text-purple-400 font-semibold">50,000+</span> teams already using DashboardPro-->
<!--          </p>-->
<!--          <p class="text-xs text-gray-500">-->
<!--            By continuing, you agree to our-->
<!--            <a href="#" class="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors">Terms of Service</a>-->
<!--            and-->
<!--            <a href="#" class="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors">Privacy Policy</a>-->
<!--          </p>-->
<!--        </div>-->
      </div>

      <!-- Additional floating elements -->
<!--      <div class="absolute top-10 left-10 w-4 h-4 bg-purple-500 rounded-full opacity-60 animate-ping"></div>-->
<!--      <div class="absolute bottom-20 right-20 w-6 h-6 bg-blue-500 rounded-full opacity-40 animate-pulse"></div>-->
<!--      <div class="absolute top-1/3 right-10 w-2 h-2 bg-indigo-400 rounded-full opacity-80 animate-bounce"></div>-->
    </div>
  </div>
  </div>
</template>

<script setup>
// Meta tags for SEO
useHead({
  title: 'Dashboard - Next Generation Admin Platform',
  meta: [
    { name: 'description', content: 'Experience the future of digital management with our next-generation admin platform' }
  ]
})

// Optional: Add page transitions or mounted lifecycle hooks
onMounted(() => {
  // Add any client-side animations or interactions here
})
</script>

<style scoped>
.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(147, 51, 234, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(147, 51, 234, 0.7);
}
</style>