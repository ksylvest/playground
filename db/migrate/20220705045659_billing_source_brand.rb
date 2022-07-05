class BillingSourceBrand < ActiveRecord::Migration[7.0]
  BRANDS = [
    'American Express',
    'Diners Club',
    'Discover',
    'JCB',
    'MasterCard',
    'UnionPay',
    'Visa',
    'Unknown',
  ].freeze

  def change
    create_enum(:billing_source_brand, BRANDS)

    reversible do |dir|
      dir.up do
        execute(<<~SQL.squish)
          ALTER TABLE "billing_sources"
          ALTER COLUMN "brand" TYPE "billing_source_brand" USING "funding"::billing_source_brand;
        SQL
      end

      dir.down do
        execute(<<~SQL.squish)
          ALTER TABLE "billing_sources"
          ALTER COLUMN "brand" TYPE VARCHAR USING "brand"::VARCHAR;
        SQL
      end
    end
  end
end
