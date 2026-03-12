import Foundation

struct VerificationMeta: Decodable, Equatable {
    var description: String?
    var issuer: String?
    var role: String?
    var claimType: String?
    var parentAuthorities: [String]?
    var authorizedBy: String?
    var authorizedFrom: String?
    var authorizedTo: String?
    var successor: String?

    var responseTypes: [String: ResponseType]?

    var retentionLaws: [RetentionLaw]?

    var charNormalization: String?
    var ocrNormalizationRules: [OCRNormalizationRule]?

    struct ResponseType: Decodable, Equatable {
        var `class`: String?
        var text: String?
        var link: String?

        var classification: VerificationClassification {
            switch (`class` ?? "").lowercased() {
            case "affirming": return .affirming
            case "denying": return .denying
            default: return .unknown
            }
        }

        var policyURL: URL? {
            guard let link else { return nil }
            return URL(string: link)
        }
    }

    struct RetentionLaw: Decodable, Equatable {
        var jurisdiction: String?
        var law: String?
        var link: String?
        var summary: String?
    }

    struct OCRNormalizationRule: Decodable, Equatable {
        var pattern: String?
        var replacement: String?
        var description: String?
    }

}

