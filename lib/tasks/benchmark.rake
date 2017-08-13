require 'benchmark'

ITERATIONS = 500

namespace :benchmark do
  task test: :environment do
    runtime = 'json'
    addresses = Fabricate.build_times(400, :address)
    companies = Fabricate.build_times(400, :company)

    def addresses_using_json(addresses)
      ApplicationController.render(json: addresses)
    end

    def addresses_using_jbuilder_inline(addresses)
      ApplicationController.render(template: 'addresses/inline', assigns: { addresses: addresses })
    end

    def addresses_using_jbuilder_nested(addresses)
      ApplicationController.render(template: 'addresses/nested', assigns: { addresses: addresses })
    end

    def companies_using_json(companies)
      ApplicationController.render(json: companies)
    end

    def companies_using_jbuilder_inline(companies)
      ApplicationController.render(template: 'companies/inline', assigns: { companies: companies })
    end

    def companies_using_jbuilder_nested(companies)
      ApplicationController.render(template: 'companies/nested', assigns: { companies: companies })
    end

    raise if addresses_using_json(addresses) != addresses_using_jbuilder_inline(addresses)
    raise if addresses_using_json(addresses) != addresses_using_jbuilder_nested(addresses)
    raise if companies_using_json(companies) != companies_using_jbuilder_inline(companies)
    raise if companies_using_json(companies) != companies_using_jbuilder_nested(companies)

    Benchmark.bmbm(32) do |benchmark|
      benchmark.report("addresses using json (#{runtime})") do
        ITERATIONS.times { addresses_using_json(addresses) }
      end

      benchmark.report("addresses using jbuilder (inline) (#{runtime})") do
        ITERATIONS.times { addresses_using_jbuilder_inline(addresses) }
      end

      benchmark.report("addresses using jbuilder (nested) (#{runtime})") do
        ITERATIONS.times { addresses_using_jbuilder_nested(addresses) }
      end

      benchmark.report("companies using json (#{runtime})") do
        ITERATIONS.times { companies_using_json(companies) }
      end

      benchmark.report("companies using jbuilder (inline) (#{runtime})") do
        ITERATIONS.times { companies_using_jbuilder_inline(companies) }
      end

      benchmark.report("companies using jbuilder (nested) (#{runtime})") do
        ITERATIONS.times { companies_using_jbuilder_nested(companies) }
      end
    end
  end
end
