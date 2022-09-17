require_relative 'herbit'
require 'yaml'

DEFAULT_SCRIPT = './bin/script.yml'.freeze
SHIP = ARGV[0] || 'dev'
PORT = ARGV[1] || DEFAULT_PORT

def main(script = DEFAULT_SCRIPT)
  script = YAML.load_file(script)
  h = Herbit.new(port: PORT)

  # merge & mount phase
  for cmd in script['merge'] do
    h.run_app(cmd)
  end

  for cmd in script['mount'] do
    h.run_app(cmd)
  end

  # sync app desk
  for cmd in script['sync'] do
    puts "[system] #{cmd} #{SHIP}"
    system("#{cmd} #{SHIP}")
  end

  # commit & install phase
  for cmd in script['commit'] do
    h.run_app(cmd)  
  end

  for cmd in script['install'] do
    h.run_app(cmd)  
  end
end

main()
