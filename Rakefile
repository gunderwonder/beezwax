require 'rake'
require 'sprockets'

BEEZWAX_DIRECTORY = File.expand_path(File.dirname(__FILE__))
BEEZWAX_SOURCE_DIRECTORY = File.join(BEEZWAX_DIRECTORY, 'src')
BEEZWAX_LOAD_PATH = File.join(BEEZWAX_DIRECTORY, 'lib')
BEEZWAX_BUILD_PATH = File.join(BEEZWAX_DIRECTORY, 'build')

task :default => :build

directory BEEZWAX_BUILD_PATH
directory BEEZWAX_LOAD_PATH

task :build => ['lib/prototype.s2.min.js', BEEZWAX_BUILD_PATH] do 
	
	secretary = Sprockets::Secretary.new(
      :load_path      => BEEZWAX_LOAD_PATH,
      :source_files   => BEEZWAX_SOURCE_DIRECTORY + '/*.js'
    )
    secretary.concatenation.save_to(File.join(BEEZWAX_BUILD_PATH, 'beezwax.js'))
	# minify File.join(BEEZWAX_BUILD_PATH, 'beezwax.js'), File.join(BEEZWAX_BUILD_PATH, 'beezwax.min.js')
end

task :clean do
	rm_r BEEZWAX_BUILD_PATH
	rm_r BEEZWAX_LOAD_PATH
end

file 'lib/prototype.s2.min.js' => [BEEZWAX_LOAD_PATH] do 
	sh 'cd vendor/scripty2 && rake clean dist:experimental unified:experimental'
	['prototype.js', 's2.js', 'prototype.s2.min.js'].each do |source|
		cp 'vendor/scripty2/dist/' + source, BEEZWAX_LOAD_PATH
	end
end

def minify(source, target)
	sh "java -jar vendor/scripty2/vendor/yuicompressor/yuicompressor-2.4.2.jar #{source} -o #{target}"
end

