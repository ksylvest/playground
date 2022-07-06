class BillingSourceFunding < ActiveRecord::Migration[7.0]
  FUNDINGS = %w[credit debit prepaid unknown].freeze

  def change
    create_enum :billing_source_funding, FUNDINGS

    reversible do |dir|
      dir.up do
        execute(<<~SQL.squish)
          ALTER TABLE "billing_sources"
          ALTER COLUMN "funding" TYPE "billing_source_funding" USING "funding"::billing_source_funding;
        SQL
      end

      dir.down do
        execute(<<~SQL.squish)
          ALTER TABLE "billing_sources"
          ALTER COLUMN "funding" TYPE VARCHAR USING "funding"::VARCHAR;
        SQL
      end
    end
  end
end
